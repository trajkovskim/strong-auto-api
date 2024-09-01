import { Card } from 'components/common';
import styled from 'styled-components';
import theme from 'theme';

export const StyledCard = styled(Card)`
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);

  transition: 400ms;

  & > *:first-child {
    max-height: 600px;
    flex: 1 0 0;
  }

  cursor: pointer;

  .carousel_change-options {
    z-index: 3;
  }

  color: white;

  .carousel_change-options > *::before {
    border-color: ${theme.productCard.carouselChangeOptionsBorder} !important;
  }

  .carousel_change-option_active::before {
    background-color: ${theme.productCard.carouselChangeOptionsFillColor} !important;
    border-color: ${theme.productCard.carouselChangeOptionsFillBorder} !important;
  }

  &:hover {
    color: ${theme.productCard.hoverColor};

    .carousel_change-options > *::before {
      border-color: ${theme.productCard.carouselChangeOptionsBorderHover} !important;
    }

    .carousel_change-option_active::before {
      background-color: ${theme.productCard.carouselChangeOptionsFillColorHover} !important;
      border-color: ${theme.productCard.carouselChangeOptionsFillBorderHover} !important;
    }
  }
`;

export const StyledShopProductCard = styled(StyledCard)`
  color: black;
`;
