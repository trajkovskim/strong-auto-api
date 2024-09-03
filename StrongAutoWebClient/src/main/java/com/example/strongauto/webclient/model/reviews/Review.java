package com.example.strongauto.webclient.model.reviews;

import com.example.strongauto.webclient.model.reviews.enums.StarRating;
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
