import BookmarkedButton from 'components/card/BookmarkedButton';
import { StyledCard } from 'components/card/card.styled';
import { ribbons } from 'components/card/constants';
import ProductCardImages from 'components/card/ProductCardImages';
import ProductCardPrice from 'components/card/ProductCardPrice';
import ProductTitle from 'components/card/ProductTitle';
import { ProductProps } from 'components/card/types';
import { Container, Ribbon } from 'components/common';
import { OnImageContainer } from 'components/common/card/Card.styled';
import React from 'react';

const MiniProductCard: React.FC<ProductProps> = (props) => {
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
      <Container styleConfig={{ direction: 'row', gap: '1rem', justifyContent: 'space-between', alignItems: 'end' }}>
        <ProductTitle title={props.title} onView={props.onView} />
        <ProductCardPrice amount={props.amount} />
      </Container>
    </OnImageContainer>
  );
  const image = <ProductCardImages id={props.id} images={props.images} height="350px" />;

  return (
    <StyledCard
      className={props.className}
      fullwidth={props.fullwidth}
      image={image}
      onImageContainer={onImageContainer}
      onClick={props.onView}
    />
  );
};

export default MiniProductCard;
