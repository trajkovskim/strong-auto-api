package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Vehicle make dto.
 */
@Getter
@Builder
public class VehicleMakeDto {

  private Long id;
  private String make;
  private List<VehicleModelDto> models;
}
