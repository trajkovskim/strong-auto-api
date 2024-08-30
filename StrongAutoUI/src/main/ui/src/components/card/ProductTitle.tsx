import { ProductProps } from 'components/card/types';
import { Button, Container, Text } from 'components/common';
import React from 'react';
import styled from 'styled-components';

const ProductCardTitleWrapper = styled(Container)`
  button {
    overflow: hidden;
  }

  span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

type Props = Pick<ProductProps, 'title' | 'summary' | 'onView'>;

const ProductTitle: React.FC<Props> = (props) => {
  return (
    <ProductCardTitleWrapper styleConfig={{ overflow: 'hidden', alignItems: 'center', padding: { top: 'sm' } }}>
      <Button maxContent themeType="link" onClick={props.onView} size="lg">
        <div>{props.title}</div>
        {props.summary && (
          <Text fontSize="sm" title={props.summary}>
            {props.summary}
          </Text>
        )}
      </Button>
    </ProductCardTitleWrapper>
  );
};

export default ProductTitle;
