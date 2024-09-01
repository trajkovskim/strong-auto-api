package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VehicleImageEmbeddedDto {

  private Long id;
  private String name;
  private String contentType;
}
