import { mapToAction } from 'context/utils';
import {
  SET_VEHICLE_FEATURES_ACTION,
  SET_VEHICLE_FILTERS_ACTION,
  SET_VEHICLE_MAKES_ACTION,
} from 'context/vehicles/action';
import {
  BaseReducerFunction,
  SetVehicleFeaturesActionType,
  SetVehicleFiltersActionType,
  SetVehicleMakesActionType,
  VehiclesState,
} from 'context/vehicles/types';

export const initialState: VehiclesState = { filters: {} };

export const setVehicleFilters: BaseReducerFunction<SetVehicleFiltersActionType> = (state, action) => ({
  ...state,
  filters: { ...(action.filters ?? state.filters) },
});

export const setVehicleMakes: BaseReducerFunction<SetVehicleMakesActionType> = (state, action) => ({
  ...state,
  makes: action.makes ?? state.makes,
});

export const setVehicleFeatures: BaseReducerFunction<SetVehicleFeaturesActionType> = (state, action) => ({
  ...state,
  features: action.features ?? state.features,
});

const vehiclesReducer = mapToAction(
  {
    [SET_VEHICLE_FILTERS_ACTION]: setVehicleFilters,
    [SET_VEHICLE_MAKES_ACTION]: setVehicleMakes,
    [SET_VEHICLE_FEATURES_ACTION]: setVehicleFeatures,
  },
  initialState
);

export default vehiclesReducer;
