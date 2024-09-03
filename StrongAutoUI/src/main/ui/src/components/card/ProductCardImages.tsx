import { ProductProps } from 'components/card/types';
import CarouselLazyLoadImages from 'components/CarouselLazyLoadImages';
import React from 'react';

type Props = Pick<ProductProps, 'images' | 'id'> & {
  height: string;
};

const ProductCardImages: React.FC<Props> = (props) => {
  const images = (props.images?.map((image) => image.links?.binary?.href).filter(Boolean) as string[]) ?? [];

  return (
    <CarouselLazyLoadImages
      height={props.height}
      fade
      arrows={false}
      initialSlide={0}
      lazyLoad="ondemand"
      dots={false}
      images={images}
    />
  );
};

export default ProductCardImages;
