import BookmarkedButton from 'components/card/BookmarkedButton';
import { ribbons } from 'components/card/constants';
import ProductCardPrice from 'components/card/ProductCardPrice';
import ProductTitle from 'components/card/ProductTitle';
import { ProductProps } from 'components/card/types';
import { BoxAnimation, Card, CarouselHandle, Container } from 'components/common';
import { OnImageContainer, StyledCarousel, StyledImage } from 'components/common/card/Card.styled';
import Ribbon from 'components/common/card/Ribbon';
import React, { useState } from 'react';
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

const ProductCard: React.FC<ProductProps> = (props) => {
  const [, setImageCarouselRef] = useState<CarouselHandle | null>(null);

  const productCardTitlePrice = (
    <Container styleConfig={{ gap: '1rem', direction: 'row', justifyContent: 'space-between', alignItems: 'end' }}>
      <ProductTitle title={props.title} summary={props.summary} onView={props.onView} />
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
    <StyledCarousel noChangeOptions noArrows ref={setImageCarouselRef}>
      {props.images?.map((image, index) => (
        <StyledImage key={index} shadow objectFit="cover" height="450px" src={image} />
      ))}
    </StyledCarousel>
  );

  // const footer = (
  //   <Container alignItems="center">
  //     <CarouselChangeOptions carousel={imageCarouselRef} />
  //   </Container>
  // );
  // const footer = (
  //   <StyledFooter>
  //     <Line />
  //     <List
  //       gap="2px"
  //       xs={4}
  //       overflow="auto"
  //       justifyContent="space-between"
  //       padding={{ bottom: 'xs', top: 'xs', left: 'md', right: 'md' }}
  //     >
  //       {props.km && (
  //         <Container padding="sm" xs={12} direction="row" gap="0.3rem">
  //           <Text fontSize="md">{formatNumber(props.km)}km</Text>
  //           <StyledIcon size="lg" icon={<FaRoad />} />
  //         </Container>
  //       )}
  //       {props.fuelType && (
  //         <Container padding="sm" xs={12} direction="row" gap="0.3rem">
  //           <Text fontSize="md">{props.fuelType}</Text>
  //           <StyledIcon size="lg" icon={<BsFuelPumpFill />} />
  //         </Container>
  //       )}
  //       {props.transmission && (
  //         <Container padding="sm" xs={12} direction="row" gap="0.3rem">
  //           <Text fontSize="md">{props.transmission}</Text>
  //           <StyledIcon size="lg" icon={<TbManualGearbox />} />
  //         </Container>
  //       )}
  //     </List>
  //   </StyledFooter>
  // );

  return (
    <BoxAnimation>
      <StyledCard
        fullwidth={props.fullwidth}
        // body={body}
        image={image}
        onImageContainer={onImageContainer}
        onClick={props.onView}
        // footer={footer}
        styleConfig={{ bordered: true }}
      />
    </BoxAnimation>
  );
};

export default ProductCard;
