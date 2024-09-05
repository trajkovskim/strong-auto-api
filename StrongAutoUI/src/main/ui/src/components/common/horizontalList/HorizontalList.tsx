import Container, { ContainerBreakpointsProps } from 'components/common/Container';
import {
  HorizontalListChildrenWrapper,
  HorizontalListWrapper,
  HorizontalListWrapperProps,
  StyledLeftArrowButton,
  StyledRightArrowButton,
} from 'components/common/horizontalList/HorizontalList.styled';
import {
  HorizontalListModel,
  createHorizontalListHandlers,
  createHorizontalListService,
} from 'components/common/horizontalList/horizontalListUtils';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

type Props = React.PropsWithChildren &
  HorizontalListWrapperProps & {
    autoScroll?: boolean;
    intervalMs?: number;
    chunkSize?: ContainerBreakpointsProps;
    gap?: React.CSSProperties['gap'];
    circular?: boolean;
    arrows?: boolean;
  };

const HorizontalList: React.FC<Props> = ({ intervalMs = 10000, autoScroll, arrows, ...props }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const interval = useRef<number>();
  const horizontalList = useRef<HorizontalListModel>();

  if (ref) {
    horizontalList.current = new HorizontalListModel(ref, !!props.circular);
  }

  const horizontalListService = useMemo(() => createHorizontalListService(ref, horizontalList, true), [ref]);
  const horizontalListHandlers = useMemo(() => createHorizontalListHandlers(ref, horizontalList, true), [ref]);

  const handleInterval = useCallback(() => {
    if (!horizontalList.current?.moving) {
      horizontalListService?.moveForward();
    }
  }, [horizontalListService]);

  const resetInterval = useCallback(() => {
    if (!autoScroll) {
      return;
    }

    clearInterval(interval.current);
    interval.current = setInterval(handleInterval, intervalMs);
  }, [autoScroll, handleInterval, intervalMs]);

  useEffect(() => {
    const listRef = ref;
    if (!listRef?.hasChildNodes || !horizontalListService || !horizontalListHandlers) {
      return;
    }

    if (autoScroll) {
      interval.current = setInterval(handleInterval, intervalMs);
    }

    let timeout = 0;
    const resizeEventHandler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => horizontalListService.fixScrollPosition(), 300);
    };

    window.addEventListener('resize', resizeEventHandler);

    const listScrollEndHandler = () => {
      resetInterval();

      if (horizontalList.current?.mouseDown) {
        return;
      }

      horizontalListHandlers.scrollEndHandler();
    };

    listRef.addEventListener('scrollend', listScrollEndHandler);

    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout);

      window.removeEventListener('resize', resizeEventHandler);
      listRef.removeEventListener('scrollend', listScrollEndHandler);
    };
  }, [autoScroll, handleInterval, horizontalListHandlers, horizontalListService, intervalMs, ref, resetInterval]);

  // Arrow controlls handlers

  const onBackButtonClick = useCallback(() => {
    if (horizontalListService?.moveBackward()) {
      resetInterval();
    }
  }, [horizontalListService, resetInterval]);

  const onForwardButtonClick = useCallback(() => {
    if (horizontalListService?.moveForward()) {
      resetInterval();
    }
  }, [horizontalListService, resetInterval]);

  const handleMouseUp: React.MouseEventHandler<HTMLElement> = () => {
    resetInterval();
    horizontalListHandlers?.mouseUpHandler();
  };

  return (
    <HorizontalListWrapper className={props.className} centered={props.centered} maxWidth={props.maxWidth}>
      <HorizontalListChildrenWrapper
        ref={setRef}
        styleConfig={{ direction: 'row', gap: props.gap, alignItems: 'center' }}
        onMouseUp={handleMouseUp}
        onMouseDown={() => horizontalListHandlers?.mouseDownHandler()}
        onTouchStart={(event) => horizontalListHandlers?.touchStartHandler(event)}
        onTouchEnd={() => horizontalListHandlers?.touchEndHandler()}
        onMouseMove={(event) => horizontalListHandlers?.mouseMoveHandler(event)}
        onTouchMove={(event) => horizontalListHandlers?.touchMoveHandler(event)}
        onMouseEnter={() => horizontalListHandlers?.mouseEnterHandler()}
        onMouseLeave={() => horizontalListHandlers?.mouseLeaveHandler()}
        // onWheel={(event) => horizontalListHandlers?.wheelHandler(event)}
      >
        {React.Children.map(props.children, (child, index) => {
          return (
            // parentGap added manually to children because element is not flex-wrap
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <Container {...props.chunkSize} parentGap={props.gap} key={index}>
              {child}
            </Container>
          );
        })}
      </HorizontalListChildrenWrapper>
      {arrows && (
        <>
          <StyledLeftArrowButton
            icon={<MdArrowBackIos />}
            maxContent
            size="md"
            themeType="link"
            onClick={onBackButtonClick}
          />
          <StyledRightArrowButton
            icon={<MdArrowForwardIos />}
            maxContent
            size="md"
            themeType="link"
            onClick={onForwardButtonClick}
          />
        </>
      )}
    </HorizontalListWrapper>
  );
};

export default React.memo(HorizontalList);
