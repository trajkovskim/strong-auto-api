import { Action } from 'context/types';
import { VehicleFeature, VehicleFilters, VehicleMake } from 'generated';

export type VehicleFiltersForm = Omit<VehicleFilters, 'priceFrom' | 'priceTo' | 'features'> & {
  price?: string;
  features?: string[];
};

type MakesValue = {
  make: VehicleMake['make'];
  models?: VehicleMake['models'];
};

export type VehiclesState = {
  filters: VehicleFiltersForm;
  makes?: Record<VehicleMake['make'], MakesValue>;
  features?: VehicleFeature[];
};

export type BaseReducerFunction<A extends Action> = (state: VehiclesState, action: A) => VehiclesState;

export type SetVehicleFiltersActionType = Action & {
  filters?: VehicleFiltersForm;
};
export type SetVehicleFiltersAction = (vehicleFilters?: VehicleFiltersForm) => SetVehicleFiltersActionType;

export type SetVehicleMakesActionType = Action & {
  makes?: Record<VehicleMake['make'], MakesValue>;
};
export type SetVehicleMakesAction = (makes?: Record<VehicleMake['make'], MakesValue>) => SetVehicleMakesActionType;

export type SetVehicleFeaturesActionType = Action & {
  features?: VehicleFeature[];
};
export type SetVehicleFeaturesAction = (features?: VehicleFeature[]) => SetVehicleFeaturesActionType;
