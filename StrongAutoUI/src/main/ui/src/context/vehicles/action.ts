import { SetVehicleFeaturesAction, SetVehicleFiltersAction, SetVehicleMakesAction } from 'context/vehicles/types';

export const SET_VEHICLE_FILTERS_ACTION = 'STRONGAUTO@SET_VEHICLE_FILTERS';
export const SET_VEHICLE_MAKES_ACTION = 'STRONGAUTO@SET_VEHICLE_MAKES';
export const SET_VEHICLE_FEATURES_ACTION = 'STRONGAUTO@SET_VEHICLE_FEATURES';

export const setVehicleFiltersAction: SetVehicleFiltersAction = (vehicleFilters) => ({
  type: SET_VEHICLE_FILTERS_ACTION,
  filters: vehicleFilters,
});

export const setVehicleMakesAction: SetVehicleMakesAction = (vehicleMakes) => ({
  type: SET_VEHICLE_MAKES_ACTION,
  makes: vehicleMakes,
});

export const setVehicleFeaturesAction: SetVehicleFeaturesAction = (vehicleFeatures) => ({
  type: SET_VEHICLE_FEATURES_ACTION,
  features: vehicleFeatures,
});
