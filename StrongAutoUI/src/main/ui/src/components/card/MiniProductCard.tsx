import BookmarkedButton from 'components/card/BookmarkedButton';
import { ribbons } from 'components/card/constants';
import ProductCardPrice from 'components/card/ProductCardPrice';
import ProductTitle from 'components/card/ProductTitle';
import { ProductProps } from 'components/card/types';
import { BoxAnimation, Container, Ribbon } from 'components/common';
import Card from 'components/common/card/Card';
import { OnImageContainer, StyledCarousel, StyledImage } from 'components/common/card/Card.styled';
import React from 'react';
import styled from 'styled-components';
import theme from 'theme';

const StyledCard = styled(Card)`
  transition: all 200ms;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);

  & > *:first-child {
    max-height: 600px;
    flex: 1 0 0;
  }

  position: relative;

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
    color: #075ebb;

    .carousel_change-options > *::before {
      border-color: ${theme.productCard.carouselChangeOptionsBorderHover} !important;
    }

    .carousel_change-option_active::before {
      background-color: ${theme.productCard.carouselChangeOptionsFillColorHover} !important;
      border-color: ${theme.productCard.carouselChangeOptionsFillBorderHover} !important;
    }
  }
`;

const MiniProductCard: React.FC<ProductProps> = (props) => {
  const productCardTitlePrice = (
    <Container styleConfig={{ direction: 'row', gap: '1rem', justifyContent: 'space-between', alignItems: 'end' }}>
      <ProductTitle title={props.title} onView={props.onView} />
      <ProductCardPrice amount={props.amount} />
    </Container>
  );

  const onImageContainer = (
    <OnImageContainer styleConfig={{ justifyContent: 'space-between', padding: 'md' }}>
      <Container styleConfig={{ direction: 'row', justifyContent: 'space-between', gap: '1rem' }}>
        {props.state && <Ribbon {...ribbons[props.state]} />}
        <BookmarkedButton
          bookmarked={props.bookmarked}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Container>
      {productCardTitlePrice}
    </OnImageContainer>
  );
  const image = (
    <StyledCarousel noChangeOptions>
      {props.images?.map((image, index) => (
        <StyledImage key={index} shadow objectFit="cover" height="350px" src={image} />
      ))}
    </StyledCarousel>
  );

  return (
    <BoxAnimation fullheight>
      <StyledCard
        fullwidth={props.fullwidth}
        image={image}
        onImageContainer={onImageContainer}
        onClick={props.onView}
      />
    </BoxAnimation>
  );
};

export default MiniProductCard;
