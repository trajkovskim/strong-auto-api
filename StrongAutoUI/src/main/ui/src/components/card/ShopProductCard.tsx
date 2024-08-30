import BookmarkedButton from 'components/card/BookmarkedButton';
import { ribbons } from 'components/card/constants';
import ProductCardPrice from 'components/card/ProductCardPrice';
import ProductTitle from 'components/card/ProductTitle';
import { ProductProps } from 'components/card/types';
import { BoxAnimation, Card, CarouselHandle, Container, List, Ribbon, Text } from 'components/common';
import { OnImageContainer, StyledCarousel, StyledIcon, StyledImage } from 'components/common/card/Card.styled';
import { useTranslation } from 'hooks';
import React, { useState } from 'react';
import { BsFuelPumpFill } from 'react-icons/bs';
import { FaRoad } from 'react-icons/fa';
import { TbManualGearbox } from 'react-icons/tb';
import styled from 'styled-components';
import theme from 'theme';
import { formatNumber } from 'utils';

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

const ShopProductCard: React.FC<ProductProps> = (props) => {
  const t = useTranslation();
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
    </OnImageContainer>
  );

  const image = (
    <StyledCarousel noChangeOptions noArrows ref={setImageCarouselRef}>
      {props.images?.map((image, index) => (
        <StyledImage key={index} shadow objectFit="cover" height="400px" src={image} />
      ))}
    </StyledCarousel>
  );

  const body = (
    <Container styleConfig={{ gap: '1rem', relative: true, padding: 'md' }}>
      {productCardTitlePrice}
      <List gap="1rem" xs={4} justifyContent="start" elementWidth="auto" style={{ overflow: 'scroll' }}>
        {props.fuelType && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<BsFuelPumpFill />} />
            <Text fontSize="md">{t(`vehicleFuelType.${props.fuelType}`)}</Text>
          </Container>
        )}
        {props.transmission && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<TbManualGearbox />} />
            <Text fontSize="md">{t(`vehicleTransmission.${props.transmission}`)}</Text>
          </Container>
        )}
        {props.mileage && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<FaRoad />} />
            <Text fontSize="md"> {t(`vehicleMileage`, { mileage: formatNumber(props.mileage) })}</Text>
          </Container>
        )}
      </List>
    </Container>
  );

  return (
    <BoxAnimation fullwidth>
      <StyledCard
        fullwidth={props.fullwidth}
        body={body}
        image={image}
        onImageContainer={onImageContainer}
        onClick={props.onView}
        styleConfig={{ bordered: true }}
      />
    </BoxAnimation>
  );
};

export default ShopProductCard;
