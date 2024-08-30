import { ProductProps } from 'components/card/types';
import { Container } from 'components/common';
import { Text } from 'components/common';
import React from 'react';
import { formatMoney } from 'utils';

type Props = Pick<ProductProps, 'amount'>;

const ProductCardPrice: React.FC<Props> = (props) => {
  if (props.amount?.totalPromo) {
    return (
      <Container styleConfig={{ alignItems: 'end', gap: '0.3rem' }}>
        <Text fontSize="sm" textDecoration="line-through">
          {formatMoney(props.amount.total)}
        </Text>
        <Text fontSize="lg" bold>
          {formatMoney(props.amount.totalPromo)}
        </Text>
      </Container>
    );
  }

  return (
    <Container styleConfig={{ alignItems: 'end' }}>
      <Text fontSize="lg" bold>
        {formatMoney(props.amount.total)}
      </Text>
    </Container>
  );
};

export default ProductCardPrice;
