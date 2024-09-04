import { initialState as initialStateBase } from 'context/base';
import { initialState as initialStateVehicles } from 'context/vehicles';
import { initialState as initialStateReviews } from 'context/reviews';
import baseReducer from 'context/base/reducer';
import { ApplicationContextState } from 'context/types';
import { combineReducers } from 'context/utils';
import vehiclesReducer from 'context/vehicles/reducer';
import reviewsReducer from 'context/reviews/reducer';

export const initialState: ApplicationContextState = {
  base: initialStateBase,
  vehicles: initialStateVehicles,
  reviews: initialStateReviews,
};

const rootReducer = combineReducers<Required<ApplicationContextState>>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  base: baseReducer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  vehicles: vehiclesReducer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  reviews: reviewsReducer,
});

export default rootReducer;
