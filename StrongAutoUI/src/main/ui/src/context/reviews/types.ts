import { Action } from 'context/types';
import { Reviews } from 'generated/strongauto-reviews';

export type ReviewsState = {
  reviews?: Reviews;
};

export type ReviewsReduceFunction<A extends Action> = (state: ReviewsState, action: A) => ReviewsState;

export type SetReviewsActionType = Action & {
  reviews?: Reviews;
};

export type SetReviewsAction = (reviews?: Reviews) => SetReviewsActionType;
