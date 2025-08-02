package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.example.strongauto.core.spi.GooglePlacesIntegrationService;
import org.springframework.stereotype.Service;

/**
 * Reviews service.
 */
@Service
@RequiredArgsConstructor
public class ReviewsService {

  private final GooglePlacesIntegrationService googleService;

  public ReviewsDto getReviews(String acceptLanguage) {

    return googleService.getReviews(acceptLanguage);
  }
}
