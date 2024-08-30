import { inputSize } from 'components/common/form/constants';
import { inputCss, StyledInputWithRightContainerProps } from 'components/common/form/Input.styled';
import { Size } from 'components/common/form/types';
import { getCalcInputHeightCss } from 'components/common/form/utils';
import styled from 'styled-components';

export const StyledSelect = styled.select<StyledInputWithRightContainerProps>`
  ${inputCss}
  background: inherit;
  height: ${(props) => props.size && getCalcInputHeightCss(props.size, false)};
  padding-left: 10px;
`;

export const StyledOption = styled.option<{ size?: Size }>`
  height: ${(props) => props.size && inputSize[props.size]};
  background-color: #fff;
`;
