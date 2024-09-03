import { Carousel as CarouselAntd } from 'antd';
import { CarouselRef as CarouselRefAntd } from 'antd/es/carousel';
import Container from 'components/common/Container';
import React from 'react';
import styled from 'styled-components';

const OnCarouselContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  color: white;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.1;
    z-index: 2;
  }

  > * {
    z-index: 3;
    position: relative;
  }
`;

type StyledCarouselProps = {
  gap?: React.CSSProperties['gap'];
};

const StyledCarousel = styled(CarouselAntd)<StyledCarouselProps>`
  & > .slick-list > * > .slick-slide {
    padding-left: ${(props) => `calc(${props.gap} / 2)`};
    padding-right: ${(props) => `calc(${props.gap} / 2)`};
  }
`;

export type CarouselRef = CarouselRefAntd;

type Props = React.ComponentProps<typeof CarouselAntd> &
  StyledCarouselProps & {
    ms?: number;
    onImageContainer?: React.ReactNode;
  };

const Carousel = React.forwardRef<CarouselRef, Props>(({ ms = 5000, onImageContainer, ...props }, ref) => {
  return (
    <Container styleConfig={{ relative: true }}>
      {onImageContainer && <OnCarouselContainer>{onImageContainer}</OnCarouselContainer>}
      <StyledCarousel ref={ref} autoplay autoplaySpeed={ms} {...props}>
        {props.children}
      </StyledCarousel>
    </Container>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
