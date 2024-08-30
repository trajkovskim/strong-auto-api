import { ProductProps } from 'components/card/types';
import { Container, FontSize } from 'components/common';
import { Text } from 'components/common';
import { useTranslation } from 'hooks';
import React from 'react';
import { formatMoney } from 'utils';

type Props = Pick<ProductProps, 'amount'> &
  React.ComponentProps<typeof Container> & {
    fontSize?: {
      total: FontSize;
      totalPromo: FontSize;
    };
  };

const ProductCardPrice: React.FC<Props> = ({ amount, fontSize, ...props }) => {
  const t = useTranslation();

  if (amount?.totalPromo) {
    return (
      <Container styleConfig={{ alignItems: 'end', gap: '0.3rem' }} {...props}>
        <Text fontSize={fontSize?.total ?? 'sm'} textDecoration="line-through">
          {formatMoney(amount.total)}
        </Text>
        <Text fontSize={fontSize?.totalPromo ?? 'lg'} bold>
          {formatMoney(amount.totalPromo)}
        </Text>
      </Container>
    );
  }

  return (
    <Container styleConfig={{ alignItems: 'end' }} {...props}>
      <Text fontSize={fontSize?.total ?? 'lg'} bold>
        {amount ? formatMoney(amount.total) : t('noPrice')}
      </Text>
    </Container>
  );
};

export default ProductCardPrice;
