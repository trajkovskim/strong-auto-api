package com.example.strongauto.webclient.model.reviews;

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
