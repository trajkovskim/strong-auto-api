import { mapToAction } from 'context/utils';
import { SET_VEHICLE_FILTERS_ACTION, SET_VEHICLE_MAKES_ACTION } from 'context/vehicles/action';
import {
  BaseReduceFunction,
  SetVehicleFiltersActionType,
  SetVehicleMakesActionType,
  VehiclesState,
} from 'context/vehicles/types';

export const initialState: VehiclesState = { filters: {} };

export const setVehicleFilters: BaseReduceFunction<SetVehicleFiltersActionType> = (state, action) => ({
  ...state,
  filters: { ...(action.filters ?? state.filters) },
});

export const setVehicleMakes: BaseReduceFunction<SetVehicleMakesActionType> = (state, action) => ({
  ...state,
  makes: action.makes ?? state.makes,
});

const vehiclesReducer = mapToAction(
  {
    [SET_VEHICLE_FILTERS_ACTION]: setVehicleFilters,
    [SET_VEHICLE_MAKES_ACTION]: setVehicleMakes,
  },
  initialState
);

export default vehiclesReducer;
