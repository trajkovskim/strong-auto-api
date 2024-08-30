import { getElementWidth } from 'utils';

enum DragDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

const overlapPercentToNextItem = 0.1;

const percentByDirection = {
  [DragDirection.LEFT]: overlapPercentToNextItem,
  [DragDirection.RIGHT]: 1 - overlapPercentToNextItem,
};

const preventClick = (event: Event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
};

export class HorizontalListModel {
  listRef: HTMLElement;
  mouseDown = false;
  mouseOver = false;
  previousTouch: number | null = null;
  moving = false;
  dragDirection: DragDirection = DragDirection.LEFT;
  circular = true;

  constructor(listRef: HTMLElement, circular: boolean) {
    this.listRef = listRef;
    this.circular = circular;
  }

  getListRef() {
    return this.listRef;
  }

  getListRefChildCount() {
    return this.getListRef().childElementCount;
  }

  hasMinElements() {
    return this.getListRefChildCount() >= 4;
  }

  getFirstElementChild() {
    return this.listRef.firstElementChild as HTMLElement | null;
  }

  getLastElementChild() {
    return this.listRef.lastElementChild as HTMLElement | null;
  }

  getMaxScrollLeft() {
    return this.listRef.scrollWidth - this.listRef.offsetWidth;
  }

  getScrollLeft() {
    return this.listRef.scrollLeft ?? 0;
  }
}

export class HorizontalListService {
  horizontalList: HorizontalListModel;

  constructor(horizontalList: HorizontalListModel) {
    this.horizontalList = horizontalList;
  }

  checkIfReorderNeeded(listScrollLeft: number, scroll: boolean): boolean {
    if (!this.horizontalList.hasMinElements() || !this.horizontalList.circular) {
      return false;
    }

    const firstChild = this.horizontalList.getFirstElementChild();
    const lastChild = this.horizontalList.getLastElementChild();

    if (!firstChild || !lastChild) {
      return false;
    }

    const maxScrollLeft = this.horizontalList.getMaxScrollLeft();

    const listRef = this.horizontalList.getListRef();
    if (listScrollLeft <= getElementWidth(firstChild)) {
      listRef.prepend(lastChild);
      scroll && listRef.scrollTo({ left: listScrollLeft + lastChild.offsetWidth });

      return true;
    } else if (listScrollLeft >= maxScrollLeft - getElementWidth(lastChild)) {
      listRef.removeChild(firstChild);
      listRef.append(firstChild);
      scroll && listRef.scrollTo({ left: listScrollLeft - firstChild.offsetWidth });

      return true;
    }

    return false;
  }

  moveBy(deltaX: number) {
    const scrollLeft = this.horizontalList.getScrollLeft();

    const listRef = this.horizontalList.getListRef();
    listRef.scrollTo({
      left: scrollLeft + deltaX,
    });

    return true;
  }

  moveTo(left: number, behavior: ScrollBehavior = 'smooth') {
    if (this.horizontalList.moving) {
      return false;
    }

    this.horizontalList.moving = true;

    const listRef = this.horizontalList.getListRef();
    listRef.scrollTo({
      left,
      behavior,
    });

    if (behavior !== 'smooth') {
      this.horizontalList.moving = false;
    }

    return true;
  }

  fixScrollPosition() {
    const scrollLeft = this.horizontalList.getScrollLeft();
    const listRef = this.horizontalList.getListRef();

    for (const child of listRef.children) {
      const element = child as HTMLElement;

      if (
        element.offsetLeft + getElementWidth(element) * percentByDirection[this.horizontalList.dragDirection] >
        scrollLeft
      ) {
        this.moveTo(element.offsetLeft);
        break;
      }
    }
  }

  private getCurrentFirstElement() {
    const scrollLeft = this.horizontalList.getScrollLeft();
    const listRef = this.horizontalList.getListRef();

    for (const child of listRef.children) {
      const element = child as HTMLElement;

      if (element.offsetLeft >= scrollLeft) {
        return element;
      }
    }
  }

  private getNextElement() {
    return this.getCurrentFirstElement()?.nextElementSibling as HTMLElement | null;
  }

  private getPrevElement() {
    return this.getCurrentFirstElement()?.previousElementSibling as HTMLElement | null;
  }

  moveBackward() {
    if (this.horizontalList.moving) {
      return false;
    }

    let prevElement = this.getPrevElement();
    if (!prevElement) {
      const scrollLeft = this.horizontalList.getScrollLeft();
      this.checkIfReorderNeeded(scrollLeft, true);
      prevElement = this.horizontalList.getFirstElementChild() as HTMLElement;
    }

    this.moveTo(prevElement?.offsetLeft);
    return true;
  }

  moveForward() {
    if (this.horizontalList.moving) {
      return false;
    }

    const nextElement = this.getNextElement();
    const scrollLeft = this.horizontalList.getScrollLeft();
    this.checkIfReorderNeeded(scrollLeft, true);

    if (nextElement) {
      this.moveTo(nextElement.offsetLeft);
    }
  }
}

export class HorizontalListHandlers {
  horizontalList: HorizontalListModel;
  horizontalListService: HorizontalListService;

  constructor(horizontalList: HorizontalListModel) {
    this.horizontalList = horizontalList;
    this.horizontalListService = new HorizontalListService(horizontalList);
  }

  scrollEndHandler() {
    this.horizontalList.moving = false;
  }

  mouseEnterHandler() {
    this.horizontalList.mouseOver = true;
  }

  mouseLeaveHandler() {
    this.horizontalList.mouseOver = false;
  }

  // wheelHandler(event: React.WheelEvent<HTMLElement>) {
  //   if (event.deltaX <= -5) {
  //     this.horizontalListService.moveBackward();
  //   } else if (event.deltaX >= 5) {
  //     this.horizontalListService.moveForward();
  //   }
  // }

  mouseUpHandler() {
    this.horizontalList.mouseDown = false;
    this.horizontalList.moving = false;

    this.horizontalListService.fixScrollPosition();

    setTimeout(() => this.allowListRefChildrenClick(), 0);
  }

  mouseDownHandler() {
    this.horizontalList.mouseDown = true;
  }

  private mouseMoveHandlerP(movementX: number) {
    if (!this.horizontalList.mouseDown || !movementX) {
      return;
    }

    this.horizontalList.moving = true;

    this.horizontalList.dragDirection = movementX < 0 ? DragDirection.LEFT : DragDirection.RIGHT;
    this.horizontalListService.moveBy(-movementX);

    const scrollLeft = this.horizontalList.getScrollLeft();
    this.horizontalListService.checkIfReorderNeeded(scrollLeft, true);
  }

  private preventListRefChildrenClick() {
    const listRef = this.horizontalList.getListRef();

    for (const child of listRef.children) {
      child.addEventListener('click', preventClick);
    }
  }

  private allowListRefChildrenClick() {
    const listRef = this.horizontalList.getListRef();

    for (const child of listRef.children) {
      child.removeEventListener('click', preventClick);
    }
  }

  mouseMoveHandler(event: React.MouseEvent<HTMLElement>) {
    this.mouseMoveHandlerP(event.movementX);

    if (this.horizontalList.mouseDown) {
      this.preventListRefChildrenClick();
    }
  }

  private touchStartHandlerP(touchStartPosition: number) {
    this.horizontalList.getListRef().style.setProperty('touch-action', 'pan-x');
    this.horizontalList.previousTouch = touchStartPosition;
    this.mouseDownHandler();
  }

  touchStartHandler(event: React.TouchEvent<HTMLElement>) {
    this.touchStartHandlerP(event.touches[0].pageX);
  }

  touchEndHandler() {
    this.mouseUpHandler();
    this.horizontalList.previousTouch = null;
    this.horizontalList.getListRef().style.removeProperty('touch-action');
  }

  touchMoveHandler(event: React.TouchEvent<HTMLElement>) {
    {
      if (this.horizontalList.previousTouch) {
        this.mouseMoveHandlerP(event.touches[0].pageX - this.horizontalList.previousTouch);
      }
      this.horizontalList.previousTouch = event.touches[0].pageX;
    }
  }
}

export const createHorizontalListService = (
  ref: HTMLElement | null,
  horizontalList: React.MutableRefObject<HorizontalListModel | undefined>,
  circular: boolean
) => {
  if (!ref) {
    return null;
  }

  if (!horizontalList.current) {
    horizontalList.current = new HorizontalListModel(ref, circular);
  }

  return new HorizontalListService(horizontalList.current);
};

export const createHorizontalListHandlers = (
  ref: HTMLElement | null,
  horizontalList: React.MutableRefObject<HorizontalListModel | undefined>,
  circular: boolean
) => {
  if (!ref) {
    return null;
  }

  if (!horizontalList.current) {
    horizontalList.current = new HorizontalListModel(ref, circular);
  }

  return new HorizontalListHandlers(horizontalList.current);
};
