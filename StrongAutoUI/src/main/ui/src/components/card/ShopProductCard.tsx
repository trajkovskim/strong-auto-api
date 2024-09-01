import BookmarkedButton from 'components/card/BookmarkedButton';
import { StyledShopProductCard } from 'components/card/card.styled';
import { ribbons } from 'components/card/constants';
import ProductCardImages from 'components/card/ProductCardImages';
import ProductCardPrice from 'components/card/ProductCardPrice';
import ProductTitle from 'components/card/ProductTitle';
import { ProductProps } from 'components/card/types';
import { Container, List, Ribbon, Text } from 'components/common';
import { OnImageContainer, StyledIcon } from 'components/common/card/Card.styled';
import { useTranslation } from 'hooks';
import React from 'react';
import { BsFuelPumpFill } from 'react-icons/bs';
import { FaRoad } from 'react-icons/fa';
import { TbManualGearbox } from 'react-icons/tb';
import { formatNumber } from 'utils';

const ShopProductCard: React.FC<ProductProps> = (props) => {
  const t = useTranslation();

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

  const image = <ProductCardImages id={props.id} images={props.images} height="400px" />;

  const body = (
    <Container styleConfig={{ gap: '1rem', relative: true, padding: 'md' }}>
      <Container styleConfig={{ gap: '1rem', direction: 'row', justifyContent: 'space-between', alignItems: 'end' }}>
        <ProductTitle title={props.title} summary={props.summary} onView={props.onView} />
        <ProductCardPrice amount={props.amount} />
      </Container>
      <List gap="1rem" xs={4} justifyContent="start" elementWidth="auto" style={{ overflow: 'scroll' }}>
        {props.fuelType && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<BsFuelPumpFill />} />
            <Text nowrap fontSize="md">
              {t(`vehicleFuelType.${props.fuelType}`)}
            </Text>
          </Container>
        )}
        {props.transmission && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<TbManualGearbox />} />
            <Text nowrap fontSize="md">
              {t(`vehicleTransmission.${props.transmission}`)}
            </Text>
          </Container>
        )}
        {props.mileage && (
          <Container styleConfig={{ direction: 'row', gap: '0.3rem', padding: { bottom: 'sm' } }}>
            <StyledIcon size="md" icon={<FaRoad />} />
            <Text nowrap fontSize="md">
              {t(`vehicleMileage`, { mileage: formatNumber(props.mileage) })}
            </Text>
          </Container>
        )}
      </List>
    </Container>
  );

  return (
    <StyledShopProductCard
      className={props.className}
      fullwidth={props.fullwidth}
      body={body}
      image={image}
      onImageContainer={onImageContainer}
      onClick={props.onView}
      styleConfig={{ bordered: true }}
    />
  );
};

export default ShopProductCard;
