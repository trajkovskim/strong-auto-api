package org.example.strongauto.persistence.model.relations;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.VehicleFeature;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;

import java.io.Serial;
import java.io.Serializable;

/**
 * Vehicle feature ref entity.
 */
@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.VEHICLE_FEATURE_REF_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class VehicleFeatureRef {

  /**
   * Vehicle feature ref embeddable id.
   */
  @Getter
  @Setter
  @EqualsAndHashCode
  public static class Id implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JoinColumn(name = "vehicle_id", referencedColumnName = "id")
    @ManyToOne
    private Vehicle vehicle;

    @JoinColumn(name = "vehicle_feature_id", referencedColumnName = "id")
    @ManyToOne
    private VehicleFeature vehicleFeature;
  }

  @EmbeddedId
  private Id id;
}
