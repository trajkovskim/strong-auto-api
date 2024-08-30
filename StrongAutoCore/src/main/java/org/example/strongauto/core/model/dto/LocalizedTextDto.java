package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.enums.LanguageEnum;

/**
 * Localized text dto.
 */
@Getter
@Builder
public class LocalizedTextDto {

  private Long id;
  private LanguageEnum language;
  private String text;
}
