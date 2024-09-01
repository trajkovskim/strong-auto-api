import BookmarkedButton from 'components/card/BookmarkedButton';
import { StyledCard } from 'components/card/card.styled';
import { ribbons } from 'components/card/constants';
import ProductCardImages from 'components/card/ProductCardImages';
import ProductCardPrice from 'components/card/ProductCardPrice';
import ProductTitle from 'components/card/ProductTitle';
import { ProductProps } from 'components/card/types';
import { Container } from 'components/common';
import { OnImageContainer } from 'components/common/card/Card.styled';
import Ribbon from 'components/common/card/Ribbon';
import React from 'react';

const ProductCard: React.FC<ProductProps> = (props) => {
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
      <Container styleConfig={{ gap: '1rem', direction: 'row', justifyContent: 'space-between', alignItems: 'end' }}>
        <ProductTitle title={props.title} summary={props.summary} onView={props.onView} />
        <ProductCardPrice amount={props.amount} />
      </Container>
    </OnImageContainer>
  );

  const image = <ProductCardImages id={props.id} images={props.images} height="450px" />;

  return (
    <StyledCard
      className={props.className}
      fullwidth={props.fullwidth}
      image={image}
      onImageContainer={onImageContainer}
      onClick={props.onView}
      styleConfig={{ bordered: true }}
    />
  );
};

export default ProductCard;
