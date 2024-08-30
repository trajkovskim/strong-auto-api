import { BaseState } from 'context/base';
import { VehiclesState } from 'context/vehicles';

export type ApplicationContextState = {
  base: BaseState;
  vehicles: VehiclesState;
};

export type Action = {
  type: string;
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};
