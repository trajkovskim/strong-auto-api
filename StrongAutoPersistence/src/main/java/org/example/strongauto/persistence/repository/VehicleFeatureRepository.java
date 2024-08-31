package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.VehicleFeature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Vehicle feature repository.
 */
public interface VehicleFeatureRepository extends JpaRepository<VehicleFeature, Long> {

  Optional<VehicleFeature> findByGroupKeyAndFeatureKey(String groupKey, String featureKey);
}
