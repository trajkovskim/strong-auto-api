import { SetVehicleFiltersAction, SetVehicleMakesAction } from 'context/vehicles/types';

export const SET_VEHICLE_FILTERS_ACTION = 'STRONGAUTO@SET_VEHICLE_FILTERS';
export const SET_VEHICLE_MAKES_ACTION = 'STRONGAUTO@SET_VEHICLE_MAKES';

export const setVehicleFiltersAction: SetVehicleFiltersAction = (vehicleFilters) => ({
  type: SET_VEHICLE_FILTERS_ACTION,
  filters: vehicleFilters,
});
export const setVehicleMakesAction: SetVehicleMakesAction = (vehicleMakes) => ({
  type: SET_VEHICLE_MAKES_ACTION,
  makes: vehicleMakes,
});
