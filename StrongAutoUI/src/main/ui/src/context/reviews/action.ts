import { SetReviewsAction } from 'context/reviews/types';

export const SET_REVIEWS_ACTION = 'STRONGAUTO@SET_REVIEWS';

export const setReviewsAction: SetReviewsAction = (reviews) => ({
  type: SET_REVIEWS_ACTION,
  reviews,
});
