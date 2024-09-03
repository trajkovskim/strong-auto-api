package org.example.strongauto.core.model.dto.reviews;

import lombok.Builder;
import lombok.Getter;

/**
 * Review dto.
 */
@Getter
@Builder
public class ReviewerDto {

  private String profilePhotoUrl;
  private String displayName;
  private boolean isAnonymous;
}
