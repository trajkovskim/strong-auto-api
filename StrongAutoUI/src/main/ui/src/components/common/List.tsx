import { Sides } from 'components/common/Container';
import React from 'react';
import styled, { css } from 'styled-components';
import theme, { Breakpoints, BreakpointsProps } from 'theme';
import { createMedia } from 'utils';

export enum ListView {
  GRID = 'grid',
  LIST = 'list',
}

type StyledListProps = BreakpointsProps & {
  gap?: React.CSSProperties['gap'];
  justifyContent?: React.CSSProperties['justifyContent'];
  view?: ListView;
  childrenCount: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
  elementHeight?: string;
  elementWidth?: string;
  bordered?: boolean;
  rounded?: boolean;
  margin?: Breakpoints | Sides<Breakpoints>;
  padding?: Breakpoints | Sides<Breakpoints>;
  overflow?: React.CSSProperties['overflow'];
};

const createMediaQ = (props: StyledListProps, ...[breakpoint, csss]: Parameters<typeof createMedia>) => {
  const rowSize = props[breakpoint] ?? 1;

  const gridTemplate = `${props.elementHeight} / repeat(
          ${rowSize > props.childrenCount ? props.childrenCount : rowSize},
          ${props.elementWidth}
        )`;

  return createMedia(
    breakpoint,
    css`
      grid-template: ${gridTemplate};
      ${csss};
    `
  );
};

const StyledList = styled.div<StyledListProps>`
  display: grid;
  gap: ${(props) => props.gap};
  justify-content: ${(props) => props.view === ListView.GRID && props.justifyContent};

  width: 100%;

  overflow: ${(props) => props.overflow};

  grid-template: ${(props) => props.elementHeight} / ${(props) =>
      props.view === ListView.LIST
        ? 'auto'
        : `repeat(${props.childrenCount > 5 ? 5 : props.childrenCount}, ${props.elementWidth})`};

  padding: ${(props) => typeof props.padding === 'string' && theme.padding[props.padding]};
  ${(props) =>
    typeof props.padding === 'object' &&
    css`
      padding-top: ${props.padding.top && theme.padding[props.padding.top]};
      padding-bottom: ${props.padding.bottom && theme.padding[props.padding.bottom]};
      padding-left: ${props.padding.left && theme.padding[props.padding.left]};
      padding-right: ${props.padding.right && theme.padding[props.padding.right]};
    `}

  margin: ${(props) => typeof props.margin === 'string' && theme.padding[props.margin]};
  ${(props) =>
    typeof props.margin == 'object' &&
    css`
      margin-top: ${props.margin.top && theme.padding[props.margin.top]};
      margin-bottom: ${props.margin.bottom && theme.padding[props.margin.bottom]};
      margin-left: ${props.margin.left && theme.padding[props.margin.left]};
      margin-right: ${props.margin.right && theme.padding[props.margin.right]};
    `}

  border: ${(props) => props.bordered && '1px solid #eee'};
  border-radius: ${(props) => props.rounded && '25px'};

  ${(props) => createMediaQ(props, 'xs')}
  ${(props) => createMediaQ(props, 'sm')}
  ${(props) => createMediaQ(props, 'md')}
  ${(props) => createMediaQ(props, 'lg')}
  ${(props) => createMediaQ(props, 'xl')}
  ${(props) => createMediaQ(props, '2xl')}
  ${(props) => createMediaQ(props, '3xl')}
`;

type Props = React.PropsWithChildren & Omit<StyledListProps, 'childrenCount'> & React.ComponentProps<'div'>;

const List = React.forwardRef<HTMLDivElement, Props>(
  ({ gap, view = ListView.GRID, elementHeight = '1fr', elementWidth = '1fr', ...props }, ref) => {
    props.sm = props.sm ?? props.xs;
    props.md = props.md ?? props.sm;
    props.lg = props.lg ?? props.md;
    props.xl = props.xl ?? props.lg;
    props['2xl'] = props['2xl'] ?? props.xl;
    props['3xl'] = props['3xl'] ?? props['2xl'];

    const childrenCount = React.Children.count(props.children);

    return (
      <StyledList
        view={view}
        childrenCount={childrenCount}
        elementHeight={elementHeight}
        elementWidth={elementWidth}
        gap={gap}
        ref={ref}
        {...props}
      >
        {props.children}
      </StyledList>
    );
  }
);

List.displayName = 'List';

export default List;
