import React from 'react';

import { Container, Image, Text } from 'components/common';
import { useTranslation } from 'hooks';
import styled from 'styled-components';

const Tile = styled(Container)`
  border-radius: 10px;
  width: 100%;
  border: 1px solid transparent;
  cursor: pointer;

  transition: all 200ms;

  &:hover {
    border-color: #eee;
    /* transform: scale(1.05); */
  }

  user-select: none;
`;

type Props = {
  label: string;
  imageSrc?: React.ComponentProps<'img'>['src'];
  inStock: number;
  onClick?: () => void;
};

const BodyTypeTile: React.FC<Props> = (props) => {
  const t = useTranslation('home.vehiclesSection');
  const tBase = useTranslation();

  const label = tBase(props.label);
  return (
    <Tile
      styleConfig={{ textCentered: true, padding: 'md', gap: '0.5rem', alignItems: 'center' }}
      onClick={props.onClick}
    >
      <Image src={props.imageSrc} alt={label} objectFit="contain" centered />
      <Container>
        <Text fontSize="md">{label}</Text>
        <Text fontSize="sm" type="sub">
          {t('available', { n: props.inStock })}
        </Text>
      </Container>
    </Tile>
  );
};

export default BodyTypeTile;
