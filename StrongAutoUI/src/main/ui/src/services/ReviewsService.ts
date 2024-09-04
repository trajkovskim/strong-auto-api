import { Configuration, ReviewsApi } from 'generated/strongauto-reviews';
import { baseConfiguration } from 'services/api';

const REVIEWS_API = new ReviewsApi(baseConfiguration as unknown as Configuration);

export const getReviews = (...params: Parameters<typeof REVIEWS_API.getReviews>) => REVIEWS_API.getReviews(...params);
