import { Size } from 'components/common/form/types';
import { getCalcInputHeightCss } from 'components/common/form/utils';
import styled from 'styled-components';

export const StyledOptionsWrapper = styled.div`
  box-sizing: border-box;
  z-index: 999;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-top: none;
  position: absolute;
  width: 100%;
  border-bottom-left-radius: 4x;
  border-bottom-right-radius: 4px;
  border: 1px solid rgb(238, 238, 238);
  background-color: #fff;
  user-select: none;
  bottom: 0;
  transform: translateY(calc(100% + 1px));

  /* > * + * {
    border-top: 1px solid #dcdcdc;
  } */
`;

type StyledOptionProps = {
  size?: Size;
  includeLabel: boolean;
};

export const StyledOption = styled.div<StyledOptionProps>`
  min-height: ${(props) => props.size && getCalcInputHeightCss(props.size, props.includeLabel)};
  font-size: inherit;
  padding: 7px;
  padding-left: 12px;
  color: black;
  display: flex;
  align-items: center;
  width: 100%;

  &:hover,
  &:active {
    /* background-color: #dcdcdc7d; */
    color: #075ebb;
  }
`;
