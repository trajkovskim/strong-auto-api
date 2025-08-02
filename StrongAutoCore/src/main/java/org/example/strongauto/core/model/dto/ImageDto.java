package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Vehicle image dto.
 */
@Getter
@Builder
public class ImageDto {

  private Long id;
  private String name;
  private String contentType;
  private byte[] data;
}
