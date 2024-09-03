package org.example.strongauto.core.model.dto.reviews;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Reviews dto.
 */
@Getter
@Builder
public class ReviewsDto {

  private double averageRating;
  private List<ReviewDto> reviews;
}
