package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Vehicle image dto.
 */
@Getter
@Builder
public class VehicleImageDto {

  private Long id;
  private String name;
  private String contentType;
  private byte[] data;
}
