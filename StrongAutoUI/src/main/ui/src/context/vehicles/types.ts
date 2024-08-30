import { Action } from 'context/types';
import { VehicleFilters, VehicleMake } from 'generated';

export type VehicleFiltersForm = Omit<VehicleFilters, 'priceFrom' | 'priceTo'> & {
  price?: string;
};

type MakesValue = {
  make: VehicleMake['make'];
  models?: VehicleMake['models'];
};

export type VehiclesState = {
  filters: VehicleFiltersForm;
  makes?: Record<VehicleMake['make'], MakesValue>;
};

export type BaseReduceFunction<A extends Action> = (state: VehiclesState, action: A) => VehiclesState;

export type SetVehicleFiltersActionType = Action & {
  filters?: VehicleFilters;
};
export type SetVehicleFiltersAction = (vehicleFilters?: VehicleFilters) => SetVehicleFiltersActionType;

export type SetVehicleMakesActionType = Action & {
  makes?: Record<VehicleMake['make'], MakesValue>;
};
export type SetVehicleMakesAction = (makes?: Record<VehicleMake['make'], MakesValue>) => SetVehicleMakesActionType;
