import { BaseState } from 'context/base';
import { ReviewsState } from 'context/reviews';
import { VehiclesState } from 'context/vehicles';

export type ApplicationContextState = {
  base: BaseState;
  vehicles: VehiclesState;
  reviews: ReviewsState;
};

export type Action = {
  type: string;
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};
