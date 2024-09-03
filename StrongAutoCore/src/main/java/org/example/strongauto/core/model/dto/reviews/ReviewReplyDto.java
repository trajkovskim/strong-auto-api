package org.example.strongauto.core.model.dto.reviews;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * Review reply dto.
 */
@Getter
@Builder
public class ReviewReplyDto {

  private String comment;
  private LocalDateTime updateTime;
}
