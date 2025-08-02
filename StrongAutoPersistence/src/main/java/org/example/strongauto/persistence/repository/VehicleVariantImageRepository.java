package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.VehicleImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleVariantImageRepository extends JpaRepository<VehicleImage, Long> {
}
