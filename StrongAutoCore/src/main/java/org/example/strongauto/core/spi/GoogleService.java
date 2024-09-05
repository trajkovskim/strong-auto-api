package org.example.strongauto.core.spi;

import org.example.strongauto.core.model.dto.reviews.ReviewsDto;

public interface GoogleService {

  ReviewsDto getReviews(String acceptLanguage);
}
