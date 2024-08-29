package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Vehicle model dto.
 */
@Getter
@Builder
public class VehicleModelDto {

  private Long id;
  private String model;
}
