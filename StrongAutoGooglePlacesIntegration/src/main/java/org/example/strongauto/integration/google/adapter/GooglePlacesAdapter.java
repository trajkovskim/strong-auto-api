package org.example.strongauto.integration.google.adapter;

import com.google.maps.places.v1.Place;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.reviews.ReviewDto;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.example.strongauto.core.spi.GooglePlacesIntegrationService;
import org.example.strongauto.integration.google.converter.ReviewsConverter;
import org.example.strongauto.integration.google.service.GooglePlacesService;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

/**
 * Google maps service adapter service.
 */
@Service
@RequiredArgsConstructor
public class GooglePlacesAdapter implements GooglePlacesIntegrationService {

  private final GooglePlacesService googlePlacesService;
  private final ReviewsConverter reviewsConverter;

  public ReviewsDto getReviews(String placeId) {

    Locale locale = LocaleContextHolder.getLocale();
    Place place = googlePlacesService.getPlace(placeId, locale.getLanguage());

    List<ReviewDto> reviews = place.getReviewsList().stream().map(reviewsConverter::convertReview).toList();
    return ReviewsDto.builder()
        .reviews(reviews)
        .build();
  }
}
