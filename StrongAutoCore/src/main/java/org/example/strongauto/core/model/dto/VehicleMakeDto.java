package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Vehicle make dto.
 */
@Getter
@Builder(toBuilder = true)
public class VehicleMakeDto {

  private Long id;
  private String make;
  private List<VehicleModelDto> models;
}
