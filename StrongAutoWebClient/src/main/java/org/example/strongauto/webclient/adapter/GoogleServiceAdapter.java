package org.example.strongauto.webclient.adapter;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.webclient.converter.ReviewsConverter;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.example.strongauto.core.spi.GoogleService;
import org.example.strongauto.webclient.GooglePlacesApiWebClient;
import org.example.strongauto.webclient.model.google.place.PlaceData;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GoogleServiceAdapter implements GoogleService {

  private final ReviewsConverter reviewsConverter;
  private final GooglePlacesApiWebClient googlePlacesApiWebClient;

  @Cacheable("reviews")
  public ReviewsDto getReviews(String acceptLanguage) {

    PlaceData reviews = googlePlacesApiWebClient.getPlaceDataReviews(acceptLanguage).block();

    return reviewsConverter.convertReviews(reviews);
  }
}
