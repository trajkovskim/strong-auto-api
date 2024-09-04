import { SET_REVIEWS_ACTION } from 'context/reviews/action';
import { ReviewsReduceFunction, ReviewsState, SetReviewsActionType } from 'context/reviews/types';
import { mapToAction } from 'context/utils';

export const initialState: ReviewsState = {};

export const setReviews: ReviewsReduceFunction<SetReviewsActionType> = (state, action) => ({
  ...state,
  reviews: action.reviews ?? state.reviews,
});

const baseReducer = mapToAction(
  {
    [SET_REVIEWS_ACTION]: setReviews,
  },
  initialState
);

export default baseReducer;
