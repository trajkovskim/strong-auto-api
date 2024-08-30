import Button from 'components/common/Button';
import Container, { ContainerBreakpointsProps } from 'components/common/Container';
import {
  HorizontalListModel,
  createHorizontalListHandlers,
  createHorizontalListService,
} from 'components/common/horizontalList/horizontalListUtils';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import styled, { css } from 'styled-components';
import theme from 'theme';

type HorizontalListWrapperProps = {
  centered?: boolean;
  maxWidth?: string;
  gap?: React.CSSProperties['gap'];
};

const arrowCss = css`
  min-height: 5.25rem;
  min-width: 2.125rem;
  justify-content: center;
  position: absolute;

  color: white;

  top: 50%;
  transform: translateY(-50%);

  background-color: rgba(57, 65, 68, 0.5);
  &:hover {
    background-color: #394144;
  }
  margin: auto;

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

const HorizontalListWrapper = styled(Container)<HorizontalListWrapperProps>`
  margin-left: ${(props) => props.maxWidth && `calc((100% - ${props.maxWidth}) / 2)`};
  max-width: ${(props) => props.maxWidth && `calc(${props.maxWidth} + (100% - ${props.maxWidth}) / 2)`};
  width: 100%;

  @media (max-width: ${(props) => props.maxWidth}) {
    /* max-width: ${(props) => props.maxWidth}; */
    margin-left: 0;
  }
  /* transform: translateX(-100%); */
  /* margin-left: ${(props) => props.maxWidth && `calc((100% - ${props.maxWidth}) / 2 + ${props.maxWidth})`}; */

  position: relative;

  & > ${StyledLeftArrowButton}, & > ${StyledRightArrowButton} {
    opacity: 0;
  }

  &:hover > ${StyledLeftArrowButton}, &:hover > ${StyledRightArrowButton} {
    opacity: 1;
  }
`;

const HorizontalListChildrenWrapper = styled(Container)`
  /* margin-left: ${(props) => `calc(${props.styleConfig?.gap}`}; */
  /* margin-right: ${(props) => `calc(${props.styleConfig?.gap} / -2)`}; */

  & > * {
    flex: 1 0 100%;
    min-height: 100%;
    width: 100%;

    user-select: none;

    /* margin-left: ${(props) => `calc(${props.styleConfig?.gap} / 2)`};
    margin-right: ${(props) => `calc(${props.styleConfig?.gap} / 2)`}; */

    transition: 200ms all;

    /* &:hover {
      transform: translateY(-10px);
    } */
  }

  /* gap: 0; */

  overflow-x: hidden;
`;

type Props = React.PropsWithChildren &
  HorizontalListWrapperProps & {
    noAutoScroll?: boolean;
    intervalMs?: number;
    chunkSize?: ContainerBreakpointsProps;
    chunkGap?: React.CSSProperties['gap'];
    circular?: boolean;
  };

const HorizontalList: React.FC<Props> = ({ intervalMs = 10000, noAutoScroll, ...props }) => {
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
    if (noAutoScroll) {
      return;
    }

    clearInterval(interval.current);
    interval.current = setInterval(handleInterval, intervalMs);
  }, [handleInterval, intervalMs, noAutoScroll]);

  useEffect(() => {
    const listRef = ref;
    if (!listRef?.hasChildNodes || !horizontalListService || !horizontalListHandlers) {
      return;
    }

    if (!noAutoScroll) {
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
  }, [handleInterval, horizontalListHandlers, horizontalListService, intervalMs, noAutoScroll, ref, resetInterval]);

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
    <HorizontalListWrapper gap={props.gap} centered={props.centered} maxWidth={props.maxWidth}>
      <HorizontalListChildrenWrapper
        onMouseUp={handleMouseUp}
        onMouseDown={() => horizontalListHandlers?.mouseDownHandler()}
        onTouchStart={(event) => horizontalListHandlers?.touchStartHandler(event)}
        onTouchEnd={() => horizontalListHandlers?.touchEndHandler()}
        onMouseMove={(event) => horizontalListHandlers?.mouseMoveHandler(event)}
        onTouchMove={(event) => horizontalListHandlers?.touchMoveHandler(event)}
        onMouseEnter={() => horizontalListHandlers?.mouseEnterHandler()}
        onMouseLeave={() => horizontalListHandlers?.mouseLeaveHandler()}
        // onWheel={(event) => horizontalListHandlers?.wheelHandler(event)}
        ref={setRef}
        styleConfig={{ direction: 'row', gap: props.chunkGap }}
      >
        {React.Children.map(props.children, (child, index) => {
          return (
            // parentGap added manually to children because element is not flex-wrap
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <Container {...props.chunkSize} parentGap={props.chunkGap} key={index}>
              {child}
            </Container>
          );
        })}
      </HorizontalListChildrenWrapper>
      <StyledLeftArrowButton
        icon={<MdArrowBackIos />}
        maxContent
        iconSize="md"
        themeType="ghost"
        onClick={onBackButtonClick}
      />
      <StyledRightArrowButton
        icon={<MdArrowForwardIos />}
        maxContent
        iconSize="md"
        themeType="ghost"
        onClick={onForwardButtonClick}
      />
    </HorizontalListWrapper>
  );
};

const memoHorizontalList = React.memo(HorizontalList);

export default memoHorizontalList;
