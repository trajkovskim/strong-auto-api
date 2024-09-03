import { VehicleImageResponse } from 'generated/strongauto';
import useLanguage from 'hooks/useLanguage';
import { useCallback, useState } from 'react';
import { getVehicleImageEntry } from 'services/VehicleService';

const useFetchVehicleImages = (vehicleId: number) => {
  const [images, setImages] = useState<Record<number, VehicleImageResponse>>({});
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const { language } = useLanguage();

  const fetch = useCallback(
    (imageId: number) => {
      if (imageId in images) {
        return Promise.resolve();
      }

      setImageLoading((prev) => ({ ...prev, [imageId]: true }));

      return getVehicleImageEntry({ id: vehicleId, imageId: imageId, acceptLanguage: language })
        .then((response) => setImages((prev) => ({ ...prev, [response.id]: response })))
        .finally(() => setImageLoading((prev) => ({ ...prev, [imageId]: false })));
    },
    [images, language, vehicleId]
  );

  return { fetch, images, imageLoading };
};

export default useFetchVehicleImages;
