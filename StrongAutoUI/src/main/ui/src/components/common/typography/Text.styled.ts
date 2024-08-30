import { textFontSize } from 'components/common/typography/constants';
import { FontSize, TextType } from 'components/common/typography/types';
import styled, { css } from 'styled-components';

export type StyledTextProps = {
  type?: TextType;
  textAlign?: React.CSSProperties['textAlign'];
  textDecoration?: React.CSSProperties['textDecoration'];
  fontSize?: FontSize;
  bold?: boolean;
  maxContent?: boolean;
  nowrap?: boolean;
};

const colors: Record<TextType, string> = {
  base: 'inherit',
  primary: '#000',
  sub: '#a5a5a5',
};

const textCss = css<StyledTextProps & { hasOnClick: boolean }>`
  display: inline-block;
  color: ${(props) => colors[props.type ?? 'base']};
  text-align: ${(props) => props.textAlign};
  width: ${(props) => props.maxContent && 'max-content'};

  font-size: ${(props) => textFontSize[props.fontSize ?? 'default']};
  font-weight: ${(props) => props.bold && 'bold'};
  cursor: ${(props) => props.hasOnClick && 'pointer'};
  white-space: ${(props) => props.nowrap && 'nowrap'};
  text-decoration: ${(props) => props.textDecoration};
`;

export const StyledText = styled.span<StyledTextProps & { hasOnClick: boolean }>`
  ${textCss}
`;

export const StyledLabel = styled.label<StyledTextProps & { hasOnClick: boolean }>`
  ${textCss}
`;
