import { setVehicleFeaturesAction } from 'context/vehicles';
import useApplicationContext from 'hooks/useApplicationContext';
import useLanguage from 'hooks/useLanguage';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import { getVehicleFeatureEntries } from 'services/VehicleService';

const useFetchFeatures = () => {
  const { getState, dispatch } = useApplicationContext();

  const { language } = useLanguage();
  const { send: fetchVehicleFeatureEntries, loading: loadingGetVehicleFeatureEntriesRequest } = useRequest();

  useEffect(() => {
    fetchVehicleFeatureEntries(
      getVehicleFeatureEntries({ acceptLanguage: language }).then((vehicleFeatures) =>
        dispatch(setVehicleFeaturesAction(vehicleFeatures.features ?? []))
      )
    );
  }, [dispatch, fetchVehicleFeatureEntries, language]);

  return { loadingGetVehicleFeatureEntriesRequest, features: getState().vehicles.features };
};

export default useFetchFeatures;
