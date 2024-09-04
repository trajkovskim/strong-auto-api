package org.example.strongauto.core.model.dto.reviews;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReviewerDto {

  private String displayName;
  private String uri;
  private String photoUri;
}
