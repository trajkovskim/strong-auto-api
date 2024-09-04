import { setReviewsAction } from 'context/reviews';
import useApplicationContext from 'hooks/useApplicationContext';
import useLanguage from 'hooks/useLanguage';
import useRequest from 'hooks/useRequest';
import { useCallback } from 'react';
import { getReviews } from 'services/ReviewsService';

const useFetchReviews = () => {
  const { state, dispatch } = useApplicationContext();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { language } = useLanguage();
  const { send, loading } = useRequest();

  const fetch = useCallback(() => {
    if (loading || state.reviews.reviews) {
      return;
    }

    send(getReviews().then((reviews) => dispatch(setReviewsAction(reviews))));
  }, [dispatch, loading, send, state.reviews.reviews]);

  return { loading, fetch, reviews: state.reviews.reviews };
};

export default useFetchReviews;
