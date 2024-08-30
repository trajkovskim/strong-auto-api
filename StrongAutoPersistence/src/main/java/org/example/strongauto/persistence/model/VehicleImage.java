package org.example.strongauto.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;

/**
 * Vehicle image.
 */
@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.VEHICLE_IMAGE_TABLE, schema = RepositoryConstants.SCHEMA)
public class VehicleImage {

  public static final String VEHICLE_IMAGE_TABLE_SEQUENCE = "vehicle_image_sequence_generator";
  public static final String VEHICLE_IMAGE_TABLE_SEQUENCE_NAME = "vehicle_image_sequence";

  @Id
  @SequenceGenerator(
      name = VEHICLE_IMAGE_TABLE_SEQUENCE,
      sequenceName = VEHICLE_IMAGE_TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = VEHICLE_IMAGE_TABLE_SEQUENCE)
  @Column(name = "id")
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "content_type")
  private String contentType;

  @Column(name = "image")
  private byte[] image;
}
