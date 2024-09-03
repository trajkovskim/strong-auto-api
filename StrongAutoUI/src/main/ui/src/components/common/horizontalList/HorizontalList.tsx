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
  className?: string;
  centered?: boolean;
  maxWidth?: string;
};

const arrowCss = css`
  min-height: 5.25rem;
  min-width: 2.125rem;
  justify-content: center;
  position: absolute;

  top: 50%;
  transform: translateY(-50%);

  margin: auto;

  display: none;

  color: #fff;
  :active,
  :hover {
    color: #fff;
  }

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
    margin-left: 0;
  }

  position: relative;

  & > ${StyledLeftArrowButton}, & > ${StyledRightArrowButton} {
    opacity: 0;
  }

  &:hover > ${StyledLeftArrowButton}, &:hover > ${StyledRightArrowButton} {
    opacity: 1;
  }
`;

const HorizontalListChildrenWrapper = styled(Container)`
  & > * {
    flex: 1 0 100%;
    min-height: 100%;
    width: 100%;

    user-select: none;
    transition: 200ms all;
  }
  overflow-x: hidden;
`;

type Props = React.PropsWithChildren &
  HorizontalListWrapperProps & {
    noAutoScroll?: boolean;
    intervalMs?: number;
    chunkSize?: ContainerBreakpointsProps;
    gap?: React.CSSProperties['gap'];
    circular?: boolean;
  };

const HorizontalList: React.FC<Props> = ({ intervalMs = 10000, noAutoScroll: autoScroll, ...props }) => {
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
        styleConfig={{ direction: 'row', gap: props.gap, alignItems: 'center' }}
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
      <StyledLeftArrowButton
        icon={<MdArrowBackIos />}
        maxContent
        iconSize="md"
        themeType="link"
        onClick={onBackButtonClick}
      />
      <StyledRightArrowButton
        icon={<MdArrowForwardIos />}
        maxContent
        iconSize="md"
        themeType="link"
        onClick={onForwardButtonClick}
      />
    </HorizontalListWrapper>
  );
};

export default React.memo(HorizontalList);
