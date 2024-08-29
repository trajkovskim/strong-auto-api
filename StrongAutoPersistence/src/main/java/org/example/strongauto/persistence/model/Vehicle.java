package org.example.strongauto.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;
import org.example.strongauto.persistence.model.enums.Color;
import org.example.strongauto.persistence.model.enums.Currency;
import org.example.strongauto.persistence.model.enums.VehicleBodyType;
import org.example.strongauto.persistence.model.enums.VehicleCondition;
import org.example.strongauto.persistence.model.enums.VehicleDriveType;
import org.example.strongauto.persistence.model.enums.VehicleFuelType;
import org.example.strongauto.persistence.model.enums.VehicleState;
import org.example.strongauto.persistence.model.enums.VehicleTransmission;

/**
 * Vehicle persistence model.
 */
@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.VEHICLE_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class Vehicle {

  public static final String VEHICLE_TABLE_SEQUENCE = "vehicle_sequence_generator";
  public static final String VEHICLE_TABLE_SEQUENCE_NAME = "vehicle_sequence";

  @Id
  @SequenceGenerator(
      name = VEHICLE_TABLE_SEQUENCE,
      sequenceName = VEHICLE_TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = VEHICLE_TABLE_SEQUENCE)
  @Column(name = "id")
  private Long id;

  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "description")
  private String description;

  @Column(name = "summary")
  private String summary;

  @JoinColumn(name = "make_id", referencedColumnName = "id")
  @OneToOne
  private VehicleMake make;

  @JoinColumn(name = "model_id", referencedColumnName = "id")
  @OneToOne
  private VehicleModel model;

  @Enumerated(EnumType.STRING)
  @Column(name = "state")
  private VehicleState state;

  @Enumerated(EnumType.STRING)
  @Column(name = "body_type")
  private VehicleBodyType bodyType;

  @Enumerated(EnumType.STRING)
  @Column(name = "condition")
  private VehicleCondition condition;

  @Enumerated(EnumType.STRING)
  @Column(name = "drive_type")
  private VehicleDriveType driveType;

  @Enumerated(EnumType.STRING)
  @Column(name = "fuel_type")
  private VehicleFuelType fuelType;

  @Enumerated(EnumType.STRING)
  @Column(name = "transmission")
  private VehicleTransmission transmission;

  @Enumerated(EnumType.STRING)
  @Column(name = "color")
  private Color color;

  @Column(name = "mileage")
  private Integer mileage;

  @Column(name = "year_built")
  private Integer year;

  @Column(name = "doors")
  private Integer doors;

  @Column(name = "engine_size")
  private String engineSize;

  @Column(name = "total_amount")
  private Double totalAmount;

  @Column(name = "total_promo_amount")
  private Double totalPromoAmount;

  @Enumerated(EnumType.STRING)
  private Currency currency;
}
