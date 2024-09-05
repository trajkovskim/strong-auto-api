import Button from 'components/common/Button';
import Container from 'components/common/Container';
import styled, { css } from 'styled-components';
import theme from 'theme';

const arrowCss = css`
  min-width: 2.125rem;
  min-height: 2.125rem;
  justify-content: center;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  display: none;
  @media (min-width: ${theme.breakpoints.minWidth.lg}) {
    display: flex;
  }
`;

export const StyledLeftArrowButton = styled(Button)`
  ${arrowCss};
  left: 0;

  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
`;

export const StyledRightArrowButton = styled(Button)`
  ${arrowCss};
  right: 0;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
`;

export type HorizontalListWrapperProps = {
  className?: string;
  centered?: boolean;
  maxWidth?: string;
};

export const HorizontalListWrapper = styled(Container)<HorizontalListWrapperProps>`
  margin-left: ${(props) => props.maxWidth && `calc((100% - ${props.maxWidth}) / 2)`};
  max-width: ${(props) => props.maxWidth && `calc(${props.maxWidth} + (100% - ${props.maxWidth}) / 2)`};
  width: 100%;
  position: relative;

  @media (max-width: ${(props) => props.maxWidth}) {
    margin-left: 0;
  }

  & > ${StyledLeftArrowButton}, & > ${StyledRightArrowButton} {
    opacity: 0;
  }

  &:hover > ${StyledLeftArrowButton}, &:hover > ${StyledRightArrowButton} {
    opacity: 1;
  }
`;

export const HorizontalListChildrenWrapper = styled(Container)`
  overflow-x: hidden;

  & > * {
    flex: 1 0 100%;
    min-height: 100%;
    width: 100%;

    user-select: none;
    transition: 200ms all;
  }
`;
