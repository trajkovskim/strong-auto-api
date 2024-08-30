import { css as emitionCss } from '@emotion/css';
import Button from 'components/common/Button';
import Container from 'components/common/Container';
import Transition, { TransitionHandle } from 'components/common/Transition';
import React, {
  TouchEventHandler,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import styled, { css } from 'styled-components';
import theme from 'theme';

type StyledCarouselProps = {
  minHeight?: string;
  maxHeight?: string;
  absolute?: boolean;
  className?: React.ComponentProps<'div'>['className'];
};

const arrowCss = css`
  justify-content: center;

  position: absolute;

  top: 50%;
  transform: translateY(-50%);

  background-color: ${theme.carousel.arrowBackgroundColor};
  &:hover {
    background-color: ${theme.carousel.arrowBackgroundColorHover};
  }

  display: none;

  @media (min-width: ${theme.breakpoints.minWidth.lg}) {
    display: flex;
  }
`;

const StyledLeftArrowButton = styled(Button)`
  ${arrowCss};
  left: 0;

  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
`;

const StyledRightArrowButton = styled(Button)`
  ${arrowCss};
  right: 0;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
`;

const StyledCarousel = styled.div<StyledCarouselProps>`
  display: grid;
  width: 100%;
  /* overflow: hidden; */
  height: 100%;
  position: ${(props) => (props.absolute ? 'absolute' : 'relative')};
  user-select: none;

  & > ${StyledLeftArrowButton}, & > ${StyledRightArrowButton} {
    opacity: 0;
  }

  &:hover > ${StyledLeftArrowButton}, &:hover > ${StyledRightArrowButton} {
    opacity: 1;
  }
`;

const SmallRectangle = styled.span<{ fill?: boolean }>`
  padding: 10px 5px;

  &:before {
    display: block;
    content: '';
    width: ${(props) => (props.fill ? '50px' : '30px')};
    height: 7px;
    box-shadow: 0 0 3px ${theme.carousel.rectangleChangerBoxShadowColor};
    border-radius: 3px;
    border: 1px solid
      ${(props) => (props.fill ? theme.carousel.rectangleChangerBorder : theme.carousel.rectangleChangerFillBorder)};

    transition: all 200ms;

    background-color: ${(props) => props.fill && theme.carousel.rectangleChangerFillColor};
  }
`;

const CarouselChangeOptionsWrapper = styled.div`
  position: absolute;
  bottom: 0px;

  transform: translate(-50%);
  left: 50%;
`;

const StyledCarouselItem = styled.div<{
  absolute?: boolean;
  maxHeight?: string;
  minHeight?: string;
}>`
  width: 100%;
  height: 100%;
  grid-row-start: 1;
  grid-column-start: 1;

  position: ${(props) => props.absolute && 'absolute'};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
`;

type Props = React.PropsWithChildren &
  StyledCarouselProps & {
    ms?: number;
    noArrows?: boolean;
    noChangeOptions?: boolean;
    justifyContent?: string;
  };

export type CarouselHandle = {
  next: (index?: number) => void;
  prev: () => void;
  size: number;
  current: number;
};

enum SwipeDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

type ChangeOptionsProps = {
  onChange?: (index: number) => void;
  size?: number;
  current?: number;
  carousel?: CarouselHandle | null;
};

export const CarouselChangeOptions: React.FC<ChangeOptionsProps> = (props) => {
  const current = props.carousel?.current ?? props.current;
  const size = props.carousel?.size ?? props.size;
  const onChange = props.carousel?.next ?? props.onChange;

  const rectangles = useMemo(
    () =>
      Number(size) > 1 &&
      new Array(size).fill(0).map((_, index) => (
        <SmallRectangle
          className={current === index ? 'carousel_change-option_active' : undefined}
          fill={current === index}
          key={index}
          onClick={(event) => {
            event.stopPropagation();
            onChange && onChange(index);
          }}
        />
      )),
    [current, onChange, size]
  );

  if (Number(size) <= 1) {
    return <></>;
  }

  const element = (
    <Container
      className="carousel_change-options"
      styleConfig={{ direction: 'row' }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {rectangles}
    </Container>
  );

  return element;
};

const Carousel = React.forwardRef<CarouselHandle, Props>(
  ({ ms = 10000, noArrows: noArrows = false, noChangeOptions = false, ...props }, ref) => {
    const touchStart = useRef<number>();
    const touchEnd = useRef<number>();

    const minSwipeDistance = 50;

    const [currentIndex, setCurrentIndex] = useState(0);
    const children = React.Children.toArray(props.children);

    const transitionRefs = useRef<(TransitionHandle | null)[]>(new Array(children.length).fill(null));

    const getPrevIndex = useCallback(
      (currentIndex: number) => (currentIndex === 0 ? children.length - 1 : currentIndex - 1),
      [children.length]
    );

    const getAfterIndex = useCallback(
      (currentIndex: number) => (currentIndex + 1) % children.length,
      [children.length]
    );

    const change = useCallback((prevIndex: number, nextIndex: number) => {
      transitionRefs.current[prevIndex]?.gotoInitialState();
      transitionRefs.current[nextIndex]?.gotoFinalState();
    }, []);

    const handleOnBackward = useCallback(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = getPrevIndex(prevIndex);

        change(prevIndex, nextIndex);

        return nextIndex;
      });
    }, [getPrevIndex, change]);

    const handleOnForward = useCallback(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = getAfterIndex(prevIndex);

        change(prevIndex, nextIndex);

        return nextIndex;
      });
    }, [getAfterIndex, change]);

    useEffect(() => {
      transitionRefs.current[0]?.gotoFinalState();
    }, []);

    useEffect(() => {
      const interval = setInterval(handleOnBackward, ms);

      return () => {
        clearInterval(interval);
      };
    }, [handleOnBackward, currentIndex, ms]);

    const handleChange = useCallback(
      (nextIndex?: number) => {
        if (nextIndex === undefined || nextIndex === null) {
          handleOnForward();
        } else {
          setCurrentIndex((prevIndex) => {
            change(prevIndex, nextIndex);
            return nextIndex;
          });
        }
      },
      [change, handleOnForward]
    );

    const handleTouchStart: TouchEventHandler<HTMLDivElement> = useCallback((event) => {
      touchStart.current = event.targetTouches[0].clientX;
      touchEnd.current = undefined;
    }, []);

    const handleTouchMove: TouchEventHandler<HTMLDivElement> = useCallback(
      (event) => (touchEnd.current = event.targetTouches[0].clientX),
      []
    );

    const getSwipeDirection = useCallback(() => {
      if (!touchStart.current || !touchEnd.current) return;

      const distance = touchStart.current - touchEnd.current;

      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        return SwipeDirection.LEFT;
      }

      if (isRightSwipe) {
        return SwipeDirection.RIGHT;
      }

      return undefined;
    }, []);

    const handleTouchEnd: TouchEventHandler<HTMLDivElement> = useCallback(() => {
      const swipeDirection = getSwipeDirection();

      if (swipeDirection === SwipeDirection.LEFT) {
        handleChange();
      } else if (swipeDirection === SwipeDirection.RIGHT) {
        handleOnBackward();
      }
    }, [getSwipeDirection, handleChange, handleOnBackward]);

    useImperativeHandle(
      ref,
      () => ({
        next: handleChange,
        prev: handleOnBackward,
        size: children.length,
        current: currentIndex,
      }),
      [children.length, currentIndex, handleChange, handleOnBackward]
    );

    return (
      <StyledCarousel
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={props.className}
        absolute={props.absolute}
        maxHeight={props.maxHeight}
        minHeight={props.minHeight}
      >
        {children.map((child, index) => (
          <Transition
            key={index}
            ref={(ref) => (transitionRefs.current[index] = ref)}
            transition={{
              initial: emitionCss`
                opacity: 0;
                visibility: hidden;
              `,
              final: emitionCss`
                opacity: 1;
                visibility: visible;
              `,
            }}
          >
            <StyledCarouselItem maxHeight={props.maxHeight} minHeight={props.minHeight} absolute={props.absolute}>
              {child}
            </StyledCarouselItem>
          </Transition>
        ))}
        {!noChangeOptions && (
          <CarouselChangeOptionsWrapper>
            <CarouselChangeOptions size={children.length} current={currentIndex} onChange={handleChange} />
          </CarouselChangeOptionsWrapper>
        )}
        {!noArrows && children.length > 1 && (
          <>
            <StyledLeftArrowButton
              icon={<MdArrowBackIos />}
              maxContent
              iconSize="lg"
              themeType="ghost"
              onClick={handleOnBackward}
            />
            <StyledRightArrowButton
              icon={<MdArrowForwardIos />}
              maxContent
              iconSize="lg"
              themeType="ghost"
              onClick={handleOnForward}
            />
          </>
        )}
      </StyledCarousel>
    );
  }
);

Carousel.displayName = 'Carousel';

export default Carousel;
