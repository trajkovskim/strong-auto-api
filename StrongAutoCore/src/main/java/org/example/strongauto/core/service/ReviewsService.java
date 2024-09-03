package org.example.strongauto.core.service;

import com.example.strongauto.webclient.GoogleBusinessApiWebClient;
import com.example.strongauto.webclient.model.reviews.Reviews;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.converter.reviews.ReviewsConverter;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.springframework.stereotype.Service;

import java.util.List;

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

    ReviewsDto reviewsDto = reviewsConverter.convertReviews(reviews);

    return reviewsDto;
  }
}
