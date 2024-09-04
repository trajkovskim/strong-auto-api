package org.example.strongauto.webclient.model.google.business.reviews;

import lombok.Builder;
import lombok.Getter;

/**
 * Review dto.
 */
@Getter
@Builder
public class Reviewer {

  private String profilePhotoUrl;
  private String displayName;
  private boolean isAnonymous;
}
