import Carousel, { CarouselRef } from 'components/common/Carousel';
import { ContainerBreakpointsProps } from 'components/common/Container';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import theme, { bodyFontSize, Breakpoints } from 'theme';

type StyledCarouselProps = {
  className?: string;
  gap?: React.CSSProperties['gap'];
};

const StyledCarousel = styled(Carousel)<StyledCarouselProps>`
  & > .slick-list > * > .slick-slide {
    padding-right: 0.5rem;
  }

  /* & > .slick-list > * {
    margin: 0.5rem;
  } */
`;

type Props = React.ComponentProps<typeof Carousel> &
  StyledCarouselProps & {
    chunkSize?: ContainerBreakpointsProps;
  };

const preventClick = (event: Event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
};

const HorizontalList: React.FC<Props> = ({ children, chunkSize, ...props }) => {
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    const slides = carouselRef.current?.innerSlider.list.querySelectorAll('.slick-slide') as HTMLElement[];
    for (const child of slides) {
      if (isDragged) {
        child.addEventListener('click', preventClick);
      } else {
        child.removeEventListener('click', preventClick);
      }
    }
  }, [isDragged]);

  const responsive = useMemo(
    () =>
      Object.entries(chunkSize ?? {}).map(([breakpoint, slidesNumber]) => ({
        breakpoint: parseInt(bodyFontSize) * parseInt(theme.breakpoints.maxWidth[breakpoint as Breakpoints]),
        settings: {
          slidesToShow: slidesNumber as number,
        },
      })),
    [chunkSize]
  );
  const lastSlidesToShowValue = responsive[responsive.length - 1].settings.slidesToShow;

  return (
    <StyledCarousel
      responsive={responsive}
      ref={carouselRef}
      initialSlide={0}
      slidesToScroll={1}
      slidesToShow={lastSlidesToShowValue}
      draggable
      dots
      arrows
      infinite
      swipe
      beforeChange={() => setIsDragged(true)}
      afterChange={() => setIsDragged(false)}
      waitForAnimate
      {...props}
    >
      {children}
    </StyledCarousel>
  );
};

export default React.memo(HorizontalList);
