package org.example.strongauto.webclient.model.google.business.reviews;

import org.example.strongauto.webclient.model.google.business.reviews.enums.StarRating;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * Review dto.
 */
@Getter
@Builder
public class Review {

  private String name;
  private String reviewId;
  private Reviewer reviewer;
  private StarRating starRating;
  private String comment;
  private LocalDateTime updateTime;
  private LocalDateTime createTime;
  private ReviewReply reviewReply;
}
