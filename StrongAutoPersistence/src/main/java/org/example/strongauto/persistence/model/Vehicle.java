package org.example.strongauto.persistence.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;
import org.example.strongauto.persistence.model.enums.Color;
import org.example.strongauto.persistence.model.enums.Currency;
import org.example.strongauto.persistence.model.enums.VehicleCondition;
import org.example.strongauto.persistence.model.enums.VehicleState;

import java.util.HashSet;
import java.util.Set;

/**
 * Vehicle persistence model.
 */
@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.VEHICLE_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class Vehicle extends BaseEntity<Long> {

  public static final String TABLE_SEQUENCE = "vehicle_sequence_generator";
  public static final String TABLE_SEQUENCE_NAME = "vehicle_sequence";

  @Id
  @SequenceGenerator(
      name = TABLE_SEQUENCE,
      sequenceName = TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = TABLE_SEQUENCE)
  @Column(name = "id")
  private Long id;

  @JoinColumn(name = "localized_title_ref_id", referencedColumnName = "id")
  @OneToOne(cascade = CascadeType.ALL)
  private LocalizedTextList title;

  @JoinColumn(name = "localized_description_ref_id", referencedColumnName = "id")
  @OneToOne(cascade = CascadeType.ALL)
  private LocalizedTextList description;

  @JoinColumn(name = "localized_summary_ref_id", referencedColumnName = "id")
  @OneToOne(cascade = CascadeType.ALL)
  private LocalizedTextList summary;

  @JoinColumn(name = "variant_id", referencedColumnName = "id")
  @ManyToOne(cascade = CascadeType.ALL)
  private VehicleVariant variant;

  @Enumerated(EnumType.STRING)
  @Column(name = "state")
  private VehicleState state;

  @Enumerated(EnumType.STRING)
  @Column(name = "condition")
  private VehicleCondition condition;

  @Enumerated(EnumType.STRING)
  @Column(name = "color")
  private Color color;

  @Column(name = "mileage")
  private Integer mileage;

  @Column(name = "year_built")
  private Integer year;

  @Column(name = "doors")
  private Integer doors;

  @Column(name = "total_amount")
  private Double totalAmount;

  @Column(name = "total_promo_amount")
  private Double totalPromoAmount;

  @Enumerated(EnumType.STRING)
  @Column(name = "currency")
  private Currency currency;

  @JoinTable(
      name = RepositoryConstants.VEHICLE_FEATURE_REF_TABLE,
      schema = RepositoryConstants.SCHEMA,
      joinColumns = @JoinColumn(name = "vehicle_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "vehicle_feature_id", referencedColumnName = "id"))
  @ManyToMany
  private Set<VehicleFeature> features = new HashSet<>();

  @JoinColumn(name = "vehicle_id", referencedColumnName = "id")
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private Set<VehicleImage> images = new HashSet<>();
}
