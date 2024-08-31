package org.example.strongauto.core.model.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * Image dto.
 */
@Getter
@Setter
public class VehicleImageDto {

  private Long id;
  private String name;
  private byte[] data;
  private String contentType;
}
