import { Container, Image, Text } from 'components/common';
import React from 'react';
import styled from 'styled-components';

const TileWrapper = styled(Container)`
  background-color: white;
  box-shadow: 0px 5px 6px 3px rgba(35, 35, 35, 0.02);
  border: 1px solid #eee;
  border-radius: 15px;

  transition: 200ms all ease-in-out;

  cursor: ${(props) => !!props.onClick && 'pointer'};

  &:hover {
    box-shadow: 0px 5px 6px 3px rgba(35, 35, 35, 0.035);
  }
`;

type Props = {
  imageSrc?: string;
  title?: string;
  onClick?: () => void;
};

const Tile: React.FC<Props> = (props) => {
  return (
    <TileWrapper
      xs={12}
      styleConfig={{ padding: 'sm', direction: 'row', alignItems: 'center', gap: '0.5rem' }}
      onClick={props.onClick}
    >
      <Image objectFit="contain" src={props.imageSrc} height="100px" />
      <Text fontSize="lg">{props.title}</Text>
    </TileWrapper>
  );
};

export default Tile;
