package org.example.strongauto.webclient.model.reviews;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Reviews.
 */
@Getter
@Builder
public class Reviews {

  private double averageRating;
  private int totalReviewCount;
  private String nextPageToken;
  private List<Review> reviews;

}
