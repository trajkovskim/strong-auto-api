package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Vehicle feature dto.
 */
@Getter
@Builder(toBuilder = true)
public class VehicleFeatureDto {

  private Long id;
  private String groupKey;
  private String featureKey;
  private List<LocalizedTextDto> groupName;
  private List<LocalizedTextDto> featureName;
}
