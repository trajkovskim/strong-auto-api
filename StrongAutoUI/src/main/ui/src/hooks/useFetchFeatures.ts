import { VehicleFeature } from 'generated';
import useLanguage from 'hooks/useLanguage';
import useRequest from 'hooks/useRequest';
import { useEffect, useState } from 'react';
import { getVehicleFeatureEntries } from 'services/VehicleService';

const useFetchFeatures = () => {
  const [features, setFeatures] = useState<VehicleFeature[]>();
  const { language } = useLanguage();
  const { send: fetchVehicleFeatureEntries, loading: loadingGetVehicleFeatureEntriesRequest } = useRequest();

  useEffect(() => {
    fetchVehicleFeatureEntries(
      getVehicleFeatureEntries({ acceptLanguage: language }).then((vehicleFeatures) =>
        setFeatures(vehicleFeatures.features)
      )
    );
  }, [fetchVehicleFeatureEntries, language]);

  return { loadingGetVehicleFeatureEntriesRequest, features };
};

export default useFetchFeatures;
