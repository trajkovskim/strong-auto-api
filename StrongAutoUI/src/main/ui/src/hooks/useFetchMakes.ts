import { setVehicleMakesAction } from 'context/vehicles';
import { VehicleMake } from 'generated';
import useApplicationContext from 'hooks/useApplicationContext';
import useRequest from 'hooks/useRequest';
import { useEffect } from 'react';
import { getVehicleMakeEntries, getVehicleMakeEntry } from 'services/VehicleService';

const useFetchMakes = () => {
  const { getState, dispatch } = useApplicationContext();
  const makes = getState().vehicles.makes;

  const { send: sendGetVehicleMakesEntriesRequest, loading: loadingGetVehicleMakesEntriesRequest } = useRequest();
  const { send: sendGetVehicleMakeEntryRequest, loading: loadingGetVehicleMakeEntryRequest } = useRequest();

  useEffect(() => {
    if (makes) {
      return;
    }

    sendGetVehicleMakesEntriesRequest(
      getVehicleMakeEntries()
        .then((makes) => Object.fromEntries(makes.makes.map((make) => [make.make, make as VehicleMake])))
        .then((makes) => dispatch(setVehicleMakesAction(makes)))
    );
  }, [dispatch, makes, sendGetVehicleMakesEntriesRequest]);

  const fetchModels = (make: string) => {
    if (makes?.[make].models) {
      return;
    }

    sendGetVehicleMakeEntryRequest(
      getVehicleMakeEntry({ make }).then((make) => dispatch(setVehicleMakesAction({ ...makes, [make.make]: make })))
    );
  };

  return {
    makes: getState().vehicles.makes,
    fetchModels,
    loadingGetVehicleMakesEntriesRequest,
    loadingGetVehicleMakeEntryRequest,
  };
};

export default useFetchMakes;
