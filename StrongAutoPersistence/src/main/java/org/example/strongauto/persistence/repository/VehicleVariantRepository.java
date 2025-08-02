package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.VehicleVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Vehicle variant repository.
 */
@Repository
public interface VehicleVariantRepository extends JpaRepository<VehicleVariant, Long> {
}
