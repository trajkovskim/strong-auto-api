package org.example.strongauto.core.model.enums.reviews;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StarRating {

  /**
   * Star rating unspecified.
   */
  STAR_RATING_UNSPECIFIED(0),
  /**
   * One star.
   */
  ONE(1),
  /**
   * Two stars.
   */
  TWO(2),
  /**
   * Three stars.
   */
  THREE(3),
  /**
   * Four stars.
   */
  FOUR(4),
  /**
   * Five stars.
   */
  FIVE(5);

  private final int rating;
  }
