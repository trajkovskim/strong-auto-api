import Spinner from 'components/common/Spinner';
import { fontSize } from 'components/common/form/constants';
import { Size } from 'components/common/form/types';
import { getCalcInputHeightCss } from 'components/common/form/utils';
import { FontSize } from 'components/common/typography';
import { BiErrorCircle } from 'react-icons/bi';
import { GiCheckMark } from 'react-icons/gi';
import styled, { css } from 'styled-components';

export type StyledInputProps = {
  size?: Size;
  noBorder?: boolean;
};

export type StyledInputWithRightContainerProps = StyledInputProps & { rightcontainerwidth?: number };

export const inputCss = css<StyledInputWithRightContainerProps>`
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  line-height: 20px;
  outline: none;
  border: ${(props) => (props.noBorder ? 'none' : '1px solid rgb(238, 238, 238)')};
  border-radius: 4px;

  padding-right: ${(props) => `${props.rightcontainerwidth}px`};
  transition: 100ms all;

  &::placeholder {
    font-size: inherit;
  }

  &:focus {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    /* border: 1px solid black; */
  }
`;

export const StyledInput = styled.input<StyledInputWithRightContainerProps>`
  ${inputCss}
  &:not([type='checkbox']) {
    height: ${(props) => props.size && getCalcInputHeightCss(props.size, false)};
    padding: 10px;
  }
`;

export const StyledTextarea = styled.textarea<StyledInputWithRightContainerProps>`
  ${inputCss}
  padding: 10px;
  padding-left: 8px;
`;

type StyledFormFieldContainerProps = { label?: string; size?: FontSize };

export const StyledFormFieldContainer = styled.div<StyledFormFieldContainerProps>`
  font-size: ${(props) => props.size && fontSize[props.size]};

  position: relative;

  ${(props) =>
    props.label &&
    css`
      > input:not(input[type='checkbox']),
      > input:not(input[type='radio']) {
        height: ${props.size && getCalcInputHeightCss(props.size, true)};
        padding-top: ${props.size && `calc(${props.size && fontSize[props.size]} + 10px)`};
      }

      &::before {
        content: '${props.label}';
        pointer-events: none;
        top: 5px;
        left: 10px;
        font-size: ${props.size && `calc(${fontSize[props.size]} - ${fontSize[props.size]} / 4.5)`};
        position: absolute;
      }
    `}
`;

export const TextareaWrapper = styled(StyledFormFieldContainer)``;

export const SelectWrapper = styled(StyledFormFieldContainer)``;

export const StyledRightContainer = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  padding-right: 5px;
  align-items: center;
`;

export const iconCss = css`
  user-select: none;
  width: 35px;
  padding: 0 7.5px;
  height: 100%;
`;

export const StyledGiCheckMark = styled(GiCheckMark)`
  ${iconCss}
  color: green;
`;

export const StyledBiErrorCircle = styled(BiErrorCircle)`
  ${iconCss}
  color: red;
`;

export const StyledSpinner = styled(Spinner)`
  ${iconCss}
`;

export type StyledContainerProps = {
  fullwidth?: boolean;
};

export const StyledContainer = styled.div<StyledContainerProps>`
  /* position: relative; */
  width: 100%;
  max-width: ${(props) => (props.fullwidth ? '100%' : 'max-content')};
`;
