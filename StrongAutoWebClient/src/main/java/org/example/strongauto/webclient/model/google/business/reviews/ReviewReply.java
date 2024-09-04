package org.example.strongauto.webclient.model.google.business.reviews;

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
