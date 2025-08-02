package org.example.strongauto.persistence.model;

import jakarta.persistence.*;
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
@Table(name = RepositoryConstants.VEHICLE_VARIANT_IMAGE_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class VehicleVariantImage extends BaseEntity<Long> {

  public static final String TABLE_SEQUENCE = "vehicle_variant_image_sequence_generator";
  public static final String TABLE_SEQUENCE_NAME = "vehicle_variant_image_sequence";

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
