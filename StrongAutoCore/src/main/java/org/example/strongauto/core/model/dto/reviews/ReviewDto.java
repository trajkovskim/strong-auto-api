package org.example.strongauto.core.model.dto.reviews;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.enums.reviews.StarRating;

import java.time.LocalDateTime;

/**
 * Review dto.
 */
@Getter
@Builder
public class ReviewDto {

  private String reviewId;
  private ReviewerDto reviewer;
  private StarRating starRating;
  private String comment;
  private LocalDateTime updateTime;
  private LocalDateTime createTime;
  private ReviewReplyDto reviewReply;
}
