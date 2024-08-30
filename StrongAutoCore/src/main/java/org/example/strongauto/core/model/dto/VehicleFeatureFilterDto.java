package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Vehicle feature filter dto.
 */
@Getter
@Builder
public class VehicleFeatureFilterDto {

  private String groupKey;
  private String featureKey;
}
