package org.example.strongauto.persistence.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.VEHICLE_MODEL_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class VehicleModel extends BaseEntity<Long> {

  public static final String VEHICLE_MODEL_TABLE_SEQUENCE = "vehicle_model_sequence_generator";
  public static final String VEHICLE_MODEL_TABLE_SEQUENCE_NAME = "vehicle_model_sequence";

  @Id
  @SequenceGenerator(
      name = VEHICLE_MODEL_TABLE_SEQUENCE,
      sequenceName = VEHICLE_MODEL_TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = VEHICLE_MODEL_TABLE_SEQUENCE)
  @Column(name = "id")
  private Long id;

  @Column(name = "model", nullable = false)
  private String model;

  @JoinColumn(name = "make_id", referencedColumnName = "id")
  @ManyToOne(fetch = FetchType.LAZY)
  private VehicleMake make;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "model")
  private Set<VehicleVariant> variants = new HashSet<>();
}
