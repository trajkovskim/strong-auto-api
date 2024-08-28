package org.example.strongauto.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;

@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.VEHICLE_MODEL_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class VehicleModel {

  public static final String VEHICLE_MODEL_TABLE_SEQUENCE = "vehicle_model_sequence_generator";
  public static final String VEHICLE_MODEL_TABLE_SEQUENCE_NAME = "vehicle_model_sequence";

  @Id
  @SequenceGenerator(
      name = VEHICLE_MODEL_TABLE_SEQUENCE,
      sequenceName = VEHICLE_MODEL_TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = VEHICLE_MODEL_TABLE_SEQUENCE)
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "model")
  private String model;
}
