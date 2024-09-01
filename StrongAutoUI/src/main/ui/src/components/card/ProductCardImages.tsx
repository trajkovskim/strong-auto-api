import { ProductProps } from 'components/card/types';
import { ElementIntersection, Spinner, StyledCarousel, StyledImage } from 'components/common';
import { VehicleImageResponse } from 'generated';
import { useLanguage, useRequest } from 'hooks';
import React, { useCallback, useState } from 'react';
import { getVehicleImageEntry } from 'services/VehicleService';
import { transformBase64Image } from 'utils';

type Props = Pick<ProductProps, 'images' | 'id'> & {
  height: string;
};

const ProductCardImages: React.FC<Props> = (props) => {
  const [images, setImages] = useState(new Map<number, VehicleImageResponse>());
  const { loading, send } = useRequest();
  const { language } = useLanguage();
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const handleCarouselChange = useCallback(
    (prev: number, next: number) => {
      if (props.images?.[next]?.id && !images.has(props.images[next].id)) {
        send(
          getVehicleImageEntry({ id: props.id, imageId: props.images[next].id, acceptLanguage: language }).then(
            (response) => {
              images.set(response.id, response);
              setImages(new Map(images));
            }
          )
        );
      }
    },
    [images, language, props.id, props.images, send]
  );

  return (
    <ElementIntersection onEnter={() => setIsIntersecting(true)} onLeave={() => setIsIntersecting(false)}>
      <StyledCarousel
        minHeight={props.height}
        onChange={isIntersecting ? handleCarouselChange : undefined}
        noChangeOptions
        noArrows
      >
        {props.images?.map((image) =>
          loading ? (
            <Spinner key={image.id} centered />
          ) : (
            (images.has(image.id) && (
              <StyledImage
                key={image.id}
                shadow
                objectFit="cover"
                height={props.height}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                src={transformBase64Image(images.get(image.id)!)}
              />
            )) || <div />
          )
        )}
      </StyledCarousel>
    </ElementIntersection>
  );
};

export default ProductCardImages;
