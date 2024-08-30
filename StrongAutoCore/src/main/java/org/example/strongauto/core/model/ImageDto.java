package org.example.strongauto.core.model;

import lombok.Getter;
import lombok.Setter;

/**
 * Image dto.
 */
@Getter
@Setter
public class ImageDto {

  Long id;

  String name;

  byte[] image;

  String contentType;
}
