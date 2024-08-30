package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Vehicle feature dto.
 */
@Getter
@Builder(toBuilder = true)
public class VehicleFeatureDto {

  private Long id;
  private String groupKey;
  private String featureKey;
  private LocalizedTextListDto featureName;
  private LocalizedTextListDto groupName;
}
