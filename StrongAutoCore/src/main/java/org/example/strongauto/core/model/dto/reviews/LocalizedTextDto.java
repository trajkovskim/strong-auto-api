package org.example.strongauto.core.model.dto.reviews;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LocalizedTextDto {

  private String text;
  private String languageCode;
}
