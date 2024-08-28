package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.VehicleMake;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Vehicle make repository.
 */
@Repository
public interface VehicleMakeRepository extends JpaRepository<VehicleMake, Long> {

  @EntityGraph(attributePaths = {"models"})
  Optional<VehicleMake> findByMake(String make);
}
