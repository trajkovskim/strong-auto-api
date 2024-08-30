import { Sides, createPaddingProperty } from 'components/common/Container';
import Icon from 'components/common/Icon';
import Text from 'components/common/typography/Text';
import { textFontSize } from 'components/common/typography/constants';
import React from 'react';
import { css, styled } from 'styled-components';
import { Breakpoints } from 'theme';

type ThemeType = 'link' | 'link-colored' | 'default' | 'ghost' | 'delete' | 'success' | 'white';
type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'default';

type StyledProps = {
  themeType?: ThemeType;
  size?: Size;
  bold?: boolean;
  maxContent?: boolean;
  centered?: boolean;
  fullwidth?: boolean;
  textAlign?: React.CSSProperties['textAlign'];
  padding?: Breakpoints | Sides<Breakpoints>;
};

const themes: Record<ThemeType, Record<string, string>> = {
  default: {
    'background-color': '#046af2',
    'background-color-hover': '#075ebb',
    'background-color-active': '#255b9475',
    'box-shadow-focus': '#046bf257 0 0 0 3px',
    'box-shadow-active': 'rgba(20, 70, 32, 0.2) 0 1px 0 inset',
    border: '1px solid rgba(27, 31, 35, 0.15);',
    'border-radius': '4px',
    color: '#fff',
    'padding-right': '10px',
    'padding-left': '10px',
  },
  white: {
    'background-color': '#fff',
    'background-color-hover': '#fff',
    'background-color-active': '#fff',
    'box-shadow-focus': '#046bf257 0 0 0 3px',
    'box-shadow-active': 'rgba(20, 70, 32, 0.2) 0 1px 0 inset',
    border: '1px solid rgba(27, 31, 35, 0.15);',
    color: '#000',
    'padding-right': '10px',
    'padding-left': '10px',
  },
  link: {
    'background-color': 'transparent',
    'color-hover': '#075ebb',
    'color-active': '#255b9475',
    border: '0px',
  },
  delete: {
    'background-color': 'transparent',
    'color-hover': 'red',
    'color-active': 'red',
    border: '0px',
  },
  ghost: {
    'background-color': 'transparent',
    'background-color-hover': '#050B20',
    border: '1px solid rgba(58, 62, 66, 0.527);',
    'border-radius': '4px',
    'color-hover': '#fff',
    'color-active': '#fff',
    'padding-right': '10px',
    'padding-left': '10px',
  },
  'link-colored': {
    'background-color': 'transparent',
    color: '#046af2',
    'color-hover': '#075ebb',
    'color-active': '#255b9475',
    border: '0px',
  },
  success: {
    'background-color': 'transparent',
    'color-hover': '#08ad08',
    'color-active': '#08a108',
    border: '0px',
  },
};

const fontSize = textFontSize;
const buttonSize: Record<Size, string> = {
  sm: `calc(${fontSize.sm} + 25px)`,
  md: `calc(${fontSize.md} + 30px)`,
  lg: `calc(${fontSize.lg} + 35px)`,
  xl: `calc(${fontSize.xl} + 40px)`,
  '2xl': `calc(${fontSize['2xl']} + 45px)`,
  '3xl': `calc(${fontSize['2xl']} + 50px)`,
  default: 'auto',
};

const paddingSize: Record<Size, string> = {
  sm: '13px',
  md: '20px',
  lg: '25px',
  xl: '30px',
  '2xl': '35px',
  '3xl': '40px',
  default: 'auto',
};

const sizes: Record<Size, Record<string, Partial<Record<ThemeType, string> | string>>> = {
  sm: {
    'max-width': '80px',
    height: { default: buttonSize.sm, white: buttonSize.sm, ghost: buttonSize.sm },
    'padding-left': { default: paddingSize.sm, white: paddingSize.sm, ghost: paddingSize.sm },
    'padding-right': { default: paddingSize.sm, white: paddingSize.sm, ghost: paddingSize.sm },
  },
  md: {
    'max-width': '100px',
    height: { default: buttonSize.md, white: buttonSize.md, ghost: buttonSize.md },
    'padding-left': { default: paddingSize.md, white: paddingSize.md, ghost: paddingSize.md },
    'padding-right': { default: paddingSize.md, white: paddingSize.md, ghost: paddingSize.md },
  },
  lg: {
    'max-width': '120px',
    height: { default: buttonSize.lg, white: buttonSize.lg, ghost: buttonSize.lg },
    'padding-left': { default: paddingSize.lg, white: paddingSize.lg, ghost: paddingSize.lg },
    'padding-right': { default: paddingSize.lg, white: paddingSize.lg, ghost: paddingSize.lg },
  },
  xl: {
    'max-width': '120px',
    height: { default: buttonSize.xl, white: buttonSize.xl, ghost: buttonSize.xl },
    'padding-left': { default: paddingSize.xl, white: paddingSize.xl, ghost: paddingSize.xl },
    'padding-right': { default: paddingSize.xl, white: paddingSize.xl, ghost: paddingSize.xl },
  },
  '2xl': {
    'max-width': '120px',
    height: { default: buttonSize['2xl'], white: buttonSize['2xl'], ghost: buttonSize['2xl'] },
    'padding-left': { default: paddingSize['2xl'], white: paddingSize['2xl'], ghost: paddingSize['2xl'] },
    'padding-right': { default: paddingSize['2xl'], white: paddingSize['2xl'], ghost: paddingSize['2xl'] },
  },
  '3xl': {
    'max-width': '120px',
    height: { default: buttonSize['3xl'], white: buttonSize['3xl'], ghost: buttonSize['3xl'] },
    'padding-left': { default: paddingSize['3xl'], white: paddingSize['3xl'], ghost: paddingSize['3xl'] },
    'padding-right': { default: paddingSize['3xl'], white: paddingSize['3xl'], ghost: paddingSize['3xl'] },
  },
  default: {
    height: { default: buttonSize.default, white: buttonSize.default, ghost: buttonSize.default },
  },
};

const StyledButton = styled.button<StyledProps>`
  ${({
    padding,
    themeType = 'default',
    size = 'sm',
    maxContent = false,
    centered = false,
    fullwidth = false,
    textAlign,
    ...props
  }) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    background-color: ${themes[themeType]['background-color']};
    border-radius: ${themes[themeType]['border-radius']};
    color: ${themes[themeType]['color'] ?? 'inherit'};
    font-weight: ${props.bold && 'bold'};
    text-align: ${textAlign};

    transition: all 200ms;
    cursor: ${(!!props.onClick || props.type === 'submit') && 'pointer'};
    position: relative;
    user-select: none;

    margin-left: ${centered && 'auto'};
    margin-right: ${centered && 'auto'};

    width: 100%;

    ${Object.entries(sizes[size])
      .map(([property, value]) =>
        typeof value === 'object' ? `${property}: ${value[themeType]}` : `${property}: ${value}`
      )
      .join(';')};

    max-width: ${(maxContent && !fullwidth) || !sizes[size] ? 'max-content' : sizes[size]['max-width']};
    max-width: ${fullwidth && '100%'};

    /* height: ${sizes[size] && typeof sizes[size]['height'] === 'object'
      ? (sizes[size]['height'] as Record<ThemeType, string>)[themeType]
      : sizes[size]['height']}; */
    border: ${themes[themeType]['border']};

    ${createPaddingProperty(padding)};

    &:focus {
      box-shadow: ${themes[themeType]['box-shadow-focus']};
    }

    &:hover {
      ${Object.entries(themes[themeType])
        .filter(([key]) => key.endsWith('-hover'))
        .map(([property, value]) => `${property.substring(0, property.length - 6)}: ${value}`)
        .join(';')};
    }

    &:active {
      ${Object.entries(themes[themeType])
        .filter(([key]) => key.endsWith('-active'))
        .map(([property, value]) => `${property.substring(0, property.length - 7)}: ${value}`)
        .join(';')};
    }
  `}
`;

type Props = StyledProps &
  React.ComponentProps<'button'> & {
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
    iconSize?: Size;
    nowrap?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      themeType = 'default',
      size = 'sm',
      iconSize = size,
      maxContent = true,
      centered = false,
      fullwidth = false,
      textAlign = 'left',
      nowrap = false,
      type = 'button',
      children,
      icon,
      iconRight,
      ...props
    },
    ref
  ) => {
    const defaultedProps = { themeType, size, maxContent, centered, fullwidth, type };

    return (
      <StyledButton
        ref={ref}
        textAlign={textAlign}
        {...defaultedProps}
        {...props}
        onClick={props.disabled ? undefined : props.onClick}
      >
        {icon && <Icon disabled={props.disabled} icon={icon} size={iconSize} />}
        {children && (
          <Text nowrap={nowrap} fontSize={size}>
            {children}
          </Text>
        )}
        {iconRight && <Icon disabled={props.disabled} icon={iconRight} size={iconSize} />}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
