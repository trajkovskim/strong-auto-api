package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.relations.VehicleFeatureRef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleFeatureRefRepository extends JpaRepository<VehicleFeatureRef, VehicleFeatureRef.Id> {
}
