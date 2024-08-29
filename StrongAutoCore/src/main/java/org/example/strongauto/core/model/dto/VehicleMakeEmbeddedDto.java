package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Vehicle make embedded dto.
 */
@Getter
@Builder
public class VehicleMakeEmbeddedDto {

  private Long id;
  private String make;
}
