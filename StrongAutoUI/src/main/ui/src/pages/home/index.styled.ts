import { Container } from 'components/common';
import styled from 'styled-components';

export const CarouselWrapper = styled(Container)`
  color: white;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 2;
  }

  > * {
    z-index: 3;
  }
`;
