package org.example.strongauto.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;

/**
 * Vehicle image.
 */
@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.VEHICLE_IMAGE_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class VehicleImage extends BaseEntity<Long> {

  public static final String TABLE_SEQUENCE = "vehicle_image_sequence_generator";
  public static final String TABLE_SEQUENCE_NAME = "vehicle_image_sequence";

  @Id
  @SequenceGenerator(
      name = TABLE_SEQUENCE,
      sequenceName = TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = TABLE_SEQUENCE)
  @Column(name = "id")
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "content_type")
  private String contentType;

  @Lob
  @Column(name = "data")
  private byte[] data;
}
