package org.example.strongauto.core.service;

import org.example.strongauto.webclient.GoogleBusinessApiWebClient;
import org.example.strongauto.webclient.model.reviews.Reviews;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.converter.reviews.ReviewsConverter;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.springframework.stereotype.Service;

/**
 * Reviews service.
 */
@Service
@RequiredArgsConstructor
public class ReviewsService {

  private final ReviewsConverter reviewsConverter;
  private final GoogleBusinessApiWebClient googleBusinessApiWebClient;

  public ReviewsDto getReviews() {

    Reviews reviews = googleBusinessApiWebClient.getReviews().block();

    return reviewsConverter.convertReviews(reviews);
  }
}
