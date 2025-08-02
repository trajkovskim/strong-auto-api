package org.example.strongauto.persistence.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;
import org.example.strongauto.persistence.model.enums.VehicleBodyType;
import org.example.strongauto.persistence.model.enums.VehicleDriveType;
import org.example.strongauto.persistence.model.enums.VehicleFuelType;
import org.example.strongauto.persistence.model.enums.VehicleTransmission;

@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.VEHICLE_VARIANT_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class VehicleVariant extends BaseEntity<Long> {

  public static final String VEHICLE_VARIANT_TABLE_SEQUENCE = "vehicle_variant_sequence_generator";
  public static final String VEHICLE_VARIANT_TABLE_SEQUENCE_NAME = "vehicle_variant_sequence";

  @Id
  @SequenceGenerator(
      name = VEHICLE_VARIANT_TABLE_SEQUENCE,
      sequenceName = VEHICLE_VARIANT_TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = VEHICLE_VARIANT_TABLE_SEQUENCE)
  @Column(name = "id")
  private Long id;

  @JoinColumn(name = "make_id", referencedColumnName = "id")
  @ManyToOne(cascade = CascadeType.ALL)
  private VehicleMake make;

  @JoinColumn(name = "model_id", referencedColumnName = "id")
  @ManyToOne(cascade = CascadeType.ALL)
  private VehicleModel model;

  @Enumerated(EnumType.STRING)
  @Column(name = "transmission")
  private VehicleTransmission transmission;

  @Enumerated(EnumType.STRING)
  @Column(name = "drive_type")
  private VehicleDriveType driveType;

  @Enumerated(EnumType.STRING)
  @Column(name = "body_type")
  private VehicleBodyType bodyType;

  @Enumerated(EnumType.STRING)
  @Column(name = "fuel_type")
  private VehicleFuelType fuelType;

  @Column(name = "engine_size")
  private String engineSize;

  @Column(name = "engine_code")
  private String engineCode;

  @Column(name = "kW")
  private Integer kW;

  @Column(name = "year_from")
  private Integer yearFrom;

  @Column(name = "year_to")
  private Integer yearTo;

  @JoinColumn(name = "image_id", referencedColumnName = "id")
  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
  private VehicleVariantImage image;
}
