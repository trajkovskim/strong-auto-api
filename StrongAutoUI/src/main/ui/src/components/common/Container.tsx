import React from 'react';
import styled, { css } from 'styled-components';
import theme, { Breakpoints } from 'theme';
import { createMedia } from 'utils';

export type ContainerBreakpointsProps = {
  [key in Breakpoints]?: string | number;
};

export type Sides<T> = {
  top?: T;
  bottom?: T;
  left?: T;
  right?: T;
};

export type Edges<T> = {
  topLeft?: T;
  topRight?: T;
  bottomLeft?: T;
  bottomRight?: T;
};

export type ContainerParentGapBreakpointsProps = {
  [key in `${Breakpoints}ParentGap`]?: React.CSSProperties['gap'];
};

type StyledContainerBaseProps = ContainerParentGapBreakpointsProps & {
  parentGap?: React.CSSProperties['gap'];
};

type StyledContainerStyleProps = {
  margin?: Breakpoints | Sides<Breakpoints>;
  padding?: Breakpoints | Sides<Breakpoints>;
  direction?: React.CSSProperties['flexDirection'];
  alignItems?: React.CSSProperties['alignItems'];
  alignSelf?: React.CSSProperties['alignSelf'];
  justifySelf?: React.CSSProperties['justifySelf'];
  justifyContent?: React.CSSProperties['justifyContent'];
  textAlign?: React.CSSProperties['textAlign'];
  userSelect?: React.CSSProperties['userSelect'];
  gap?: React.CSSProperties['gap'];
  wrap?: boolean;
  centered?: boolean | 'vertical' | 'horizontal';
  itemsCentered?: boolean;
  textCentered?: boolean;
  bordered?: boolean | Sides<boolean>;
  rounded?: boolean | Edges<boolean>;
  relative?: boolean;
  absolute?: boolean;
  zIndex?: number;
  overflow?: React.CSSProperties['overflow'];
  minHeight?: React.CSSProperties['minHeight'];
  maxHeight?: React.CSSProperties['maxHeight'];
  order?: React.CSSProperties['order'];
};

type ContainerBreakpointsStyleProps = {
  [key in `${Breakpoints}Style`]?: StyledContainerStyleProps;
};

type StyledContainerProps = ContainerBreakpointsProps &
  ContainerBreakpointsStyleProps &
  StyledContainerBaseProps & { styleConfig?: StyledContainerStyleProps };

const MAX_COLUMNS = 12;

const calculateColumnPercentage = (breakpoint: number) => {
  return `${breakpoint} / ${MAX_COLUMNS} * 100%`;
};

const calculateColumnGap = (breakpoint: number, gap: string) => {
  return `(1 - ${breakpoint} / ${MAX_COLUMNS}) * ${gap}`;
};

const createMediaQ = (props: StyledContainerProps, breakpoint: Breakpoints, csss?: string) => {
  const breakpointValue = props[breakpoint];
  const parentGap =
    breakpointValue !== MAX_COLUMNS
      ? props[`${breakpoint}ParentGap`]?.toString() ?? props.parentGap?.toString() ?? '0rem'
      : '0rem';

  // const factor =
  // eslint-disable-next-line max-len
  //   typeof breakpointValue === 'string' && /^\d*(\.\d*)?%$/.test(breakpointValue) && parseFloat(breakpointValue) / 100;

  // max-width: ${typeof breakpointValue === 'string' && factor
  //       ? `calc(${breakpointValue} - (1 - ${factor}) * ${parentGap})`
  //       : breakpointValue};

  return createMedia(
    breakpoint,
    css`
      display: ${typeof breakpointValue === 'number' && breakpointValue === 0 && 'none'};

      width: ${typeof breakpointValue === 'string' && '100%'};
      max-width: ${typeof breakpointValue === 'string' && breakpointValue};

      width: ${typeof breakpointValue === 'number' &&
      `calc(${calculateColumnPercentage(breakpointValue)} - ${calculateColumnGap(breakpointValue, parentGap)})`};

      max-width: ${typeof breakpointValue === 'number' &&
      `calc(${calculateColumnPercentage(breakpointValue)} - ${calculateColumnGap(breakpointValue, parentGap)})`};

      ${createStyleProps(props[`${breakpoint}Style`])}
      ${csss};
    `
  );
};

export const createPaddingProperty = (padding?: Sides<Breakpoints> | Breakpoints) => css`
  padding: ${typeof padding === 'string' && theme.padding[padding]};

  ${typeof padding === 'object' &&
  css`
    padding-top: ${padding.top && theme.padding[padding.top]};
    padding-bottom: ${padding.bottom && theme.padding[padding.bottom]};
    padding-left: ${padding.left && theme.padding[padding.left]};
    padding-right: ${padding.right && theme.padding[padding.right]};
  `}
`;

export const createMarginProperty = (margin?: Sides<Breakpoints> | Breakpoints) => css`
  margin: ${typeof margin === 'string' && theme.padding[margin]};

  ${typeof margin === 'object' &&
  css`
    margin-top: ${margin.top && theme.padding[margin.top]};
    margin-bottom: ${margin.bottom && theme.padding[margin.bottom]};
    margin-left: ${margin.left && theme.padding[margin.left]};
    margin-right: ${margin.right && theme.padding[margin.right]};
  `}
`;

export const createBorderProperty = (bordered?: Sides<boolean> | boolean) => css`
  --border: 1px solid #eee;
  border: ${typeof bordered === 'boolean' && bordered && 'var(--border)'};
  ${typeof bordered == 'object' &&
  css`
    border-top: ${bordered.top && 'var(--border)'};
    border-left: ${bordered.left && 'var(--border)'};
    border-bottom: ${bordered.bottom && 'var(--border)'};
    border-right: ${bordered.right && 'var(--border)'};
  `}
`;

export const createBorderRadiusProperty = (rounded?: Edges<boolean> | boolean) => css`
  --border-radius: 5px;
  border-radius: ${typeof rounded === 'boolean' && rounded && 'var(--border-radius)'};
  ${typeof rounded == 'object' &&
  css`
    border-top-left-radius: ${rounded.topLeft && 'var(--border-radius)'};
    border-top-right-radius: ${rounded.topRight && 'var(--border-radius)'};
    border-bottom-left-radius: ${rounded.bottomLeft && 'var(--border-radius)'};
    border-bottom-right-radius: ${rounded.bottomRight && 'var(--border-radius)'};
  `}
`;

const createStyleProps = (styleConfig: StyledContainerStyleProps | undefined) =>
  styleConfig
    ? css`
        min-height: ${styleConfig.minHeight};
        max-height: ${styleConfig.maxHeight};

        position: ${styleConfig.relative && 'relative'};
        position: ${styleConfig.absolute && 'absolute'};

        z-index: ${styleConfig.zIndex && `${styleConfig.zIndex} !important`};

        overflow: ${styleConfig.overflow};

        margin-top: ${styleConfig.centered !== 'horizontal' && !!styleConfig.centered && 'auto'};
        margin-bottom: ${styleConfig.centered !== 'horizontal' && !!styleConfig.centered && 'auto'};
        margin-left: ${styleConfig.centered !== 'vertical' && !!styleConfig.centered && 'auto'};
        margin-right: ${styleConfig.centered !== 'vertical' && !!styleConfig.centered && 'auto'};

        ${createPaddingProperty(styleConfig.padding)};
        ${createMarginProperty(styleConfig.margin)};
        ${createBorderRadiusProperty(styleConfig.rounded)};
        ${createBorderProperty(styleConfig.bordered)};

        user-select: ${styleConfig.userSelect};

        gap: ${styleConfig.gap};

        flex-direction: ${styleConfig.direction};
        flex-wrap: ${styleConfig.wrap && 'wrap'};
        order: ${styleConfig.order};

        align-items: ${styleConfig.alignItems};
        align-items: ${styleConfig.itemsCentered && 'center'};

        align-self: ${styleConfig.alignSelf};
        justify-self: ${styleConfig.justifySelf};

        justify-content: ${styleConfig.justifyContent};
        justify-content: ${styleConfig.itemsCentered && 'center'};

        text-align: ${styleConfig.textAlign};
        text-align: ${styleConfig.textCentered && 'center'};
      `
    : undefined;

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  display: flex;

  ${(props) => createStyleProps(props.styleConfig)}

  ${(props) => createMediaQ(props, 'xs')};
  ${(props) => createMediaQ(props, 'sm')};
  ${(props) => createMediaQ(props, 'md')};
  ${(props) => createMediaQ(props, 'lg')};
  ${(props) => createMediaQ(props, 'xl')};
  ${(props) => createMediaQ(props, '2xl')};
  ${(props) => createMediaQ(props, '3xl')};
`;

type Props = React.PropsWithRef<
  React.PropsWithChildren<
    React.ComponentProps<'div'> &
      Omit<StyledContainerProps, 'breakpoints' | 'childrenCount' | keyof StyledContainerBaseProps>
  >
>;

const Container = React.forwardRef<HTMLDivElement, Props>(({ children, ...props }, ref) => {
  props.sm = props.sm ?? props.xs;
  props.md = props.md ?? props.sm;
  props.lg = props.lg ?? props.md;
  props.xl = props.xl ?? props.lg;
  props['2xl'] = props['2xl'] ?? props.xl;
  props['3xl'] = props['3xl'] ?? props['2xl'];

  props.smStyle = props.smStyle ?? props.xsStyle;
  props.mdStyle = props.mdStyle ?? props.smStyle;
  props.lgStyle = props.lgStyle ?? props.mdStyle;
  props.xlStyle = props.xlStyle ?? props.lgStyle;
  props['2xlStyle'] = props['2xlStyle'] ?? props.xlStyle;
  props['3xlStyle'] = props['3xlStyle'] ?? props['2xlStyle'];

  props.styleConfig = props.styleConfig ?? {};
  props.styleConfig.direction = props.styleConfig.direction ?? 'column';

  const { direction, wrap } = props.styleConfig;
  const includeParentGap = direction?.startsWith('row') && wrap;
  const childProps = includeParentGap
    ? {
        parentGap: props.styleConfig.gap,
        xsParentGap: props.xsStyle?.gap,
        smParentGap: props.smStyle?.gap ?? props.xsStyle?.gap,
        mdParentGap: props.mdStyle?.gap ?? props.smStyle?.gap,
        lgParentGap: props.lgStyle?.gap ?? props.mdStyle?.gap,
        xlParentGap: props.xlStyle?.gap ?? props.lgStyle?.gap,
        ['2xlParentGap']: props['2xlStyle']?.gap ?? props.xlStyle?.gap,
        ['3xlParentGap']: props['3xlStyle']?.gap ?? props['2xlStyle']?.gap,
      }
    : undefined;

  return (
    <StyledContainer ref={ref} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement<any>(child, { ...child.props, ...childProps });
        }

        return child;
      })}
    </StyledContainer>
  );
});

Container.displayName = 'Container';

export default Container;
