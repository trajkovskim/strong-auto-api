import { ProductProps } from 'components/card/types';
import { ElementIntersection, Spinner, StyledCarousel, StyledImage } from 'components/common';
import useFetchVehicleImages from 'hooks/useFetchVehicleImages';
import React, { useCallback, useState } from 'react';
import { transformBase64Image } from 'utils';

type Props = Pick<ProductProps, 'images' | 'id'> & {
  height: string;
};

const ProductCardImages: React.FC<Props> = (props) => {
  const { fetch, images, imageLoading } = useFetchVehicleImages(props.id);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const handleCarouselChange = useCallback(
    (prev: number, next: number) => {
      if (props.images?.[next]?.id) {
        fetch(props.images[next].id);
      }
    },
    [fetch, props.images]
  );

  return (
    <ElementIntersection onEnter={() => setIsIntersecting(true)} onLeave={() => setIsIntersecting(false)}>
      <StyledCarousel
        minHeight={props.height}
        onChange={isIntersecting ? handleCarouselChange : undefined}
        noChangeOptions
        noArrows
      >
        {props.images?.map((image) => (
          <>
            {imageLoading[image.id] && <Spinner key={image.id} centered />}
            {images[image.id] ? (
              <StyledImage
                key={image.id}
                shadow
                objectFit="cover"
                height={props.height}
                src={transformBase64Image(images[image.id])}
              />
            ) : (
              <div />
            )}
          </>
        ))}
      </StyledCarousel>
    </ElementIntersection>
  );
};

export default ProductCardImages;
