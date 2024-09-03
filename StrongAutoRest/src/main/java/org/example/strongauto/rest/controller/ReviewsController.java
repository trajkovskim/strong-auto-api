package org.example.strongauto.rest.controller;

import com.example.strongauto.rest.api.strongautoreviews.ReviewsApi;
import com.example.strongauto.rest.api.strongautoreviews.model.Reviews;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.example.strongauto.core.service.ReviewsService;
import org.example.strongauto.rest.converter.ReviewsRestConverter;
import org.springframework.http.ResponseEntity;

@StrongAutoController
@RequiredArgsConstructor
public class ReviewsController implements ReviewsApi {

  private final ReviewsService reviewsService;
  private final ReviewsRestConverter reviewsRestConverter;

  @Override
  public ResponseEntity<Reviews> getReviews() {

    ReviewsDto reviewsDto = reviewsService.getReviews();

    Reviews reviews = reviewsRestConverter.convertReviews(reviewsDto);

    return ResponseEntity.ok(reviews);
  }
}
