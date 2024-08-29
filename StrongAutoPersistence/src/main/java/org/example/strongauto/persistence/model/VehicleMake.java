package org.example.strongauto.persistence.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;

import java.util.List;

@Setter
@Getter
@Entity
@Table(name = RepositoryConstants.VEHICLE_MAKE_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class VehicleMake {

  public static final String VEHICLE_MAKE_TABLE_SEQUENCE = "vehicle_make_sequence_generator";
  public static final String VEHICLE_MAKE_TABLE_SEQUENCE_NAME = "vehicle_make_sequence";

  @Id
  @SequenceGenerator(
      name = VEHICLE_MAKE_TABLE_SEQUENCE,
      sequenceName = VEHICLE_MAKE_TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = VEHICLE_MAKE_TABLE_SEQUENCE)
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "make", unique = true)
  private String make;

  @JoinColumn(name = "make_id", referencedColumnName = "id")
  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<VehicleModel> models;
}
