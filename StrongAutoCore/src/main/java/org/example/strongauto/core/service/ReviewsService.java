package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.converter.reviews.ReviewsConverter;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.example.strongauto.webclient.GooglePlacesApiWebClient;
import org.example.strongauto.webclient.model.google.place.PlaceData;
import org.springframework.stereotype.Service;

/**
 * Reviews service.
 */
@Service
@RequiredArgsConstructor
public class ReviewsService {

  private final ReviewsConverter reviewsConverter;
  private final GooglePlacesApiWebClient googlePlacesApiWebClient;

  public ReviewsDto getReviews(String acceptLanguage) {

    PlaceData reviews = googlePlacesApiWebClient.getPlaceDataReviews(acceptLanguage).block();

    return reviewsConverter.convertReviews(reviews);
  }
}
