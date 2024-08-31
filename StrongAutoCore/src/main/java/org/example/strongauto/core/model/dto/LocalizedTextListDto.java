package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Localization text list dto.
 */
@Getter
@Builder(toBuilder = true)
public class LocalizedTextListDto {

  private Long id;
  private List<LocalizedTextDto> textList;
}
