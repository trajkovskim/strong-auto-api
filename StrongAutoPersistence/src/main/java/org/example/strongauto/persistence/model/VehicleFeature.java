package org.example.strongauto.persistence.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

/**
 * Vehicle feature entity.
 */
@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.VEHICLE_FEATURE_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class VehicleFeature {

  public static final String VEHICLE_FEATURE_TABLE_SEQUENCE = "vehicle_feature_sequence_generator";
  public static final String VEHICLE_FEATURE_TABLE_SEQUENCE_NAME = "vehicle_feature_sequence";

  @Id
  @SequenceGenerator(
      name = VEHICLE_FEATURE_TABLE_SEQUENCE,
      sequenceName = VEHICLE_FEATURE_TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = VEHICLE_FEATURE_TABLE_SEQUENCE)
  @Column(name = "id")
  private Long id;

  @Column(name="group_key", nullable = false)
  private String groupKey;

  @Column(name="feature_key", nullable = false)
  private String featureKey;

  @JoinColumn(name = "localized_group_name_ref_id", referencedColumnName = "id")
  @OneToOne(cascade = CascadeType.ALL)
  private LocalizedTextList groupName;

  @JoinColumn(name = "localized_feature_name_ref_id", referencedColumnName = "id")
  @OneToOne(cascade = CascadeType.ALL)
  private LocalizedTextList featureName;
}
