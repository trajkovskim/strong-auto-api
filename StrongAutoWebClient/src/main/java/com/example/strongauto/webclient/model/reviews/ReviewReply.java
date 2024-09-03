package com.example.strongauto.webclient.model.reviews;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * Review reply dto.
 */
@Getter
@Builder
public class ReviewReply {

  private String comment;
  private LocalDateTime updateTime;
}
