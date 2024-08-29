package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.filters.VehicleFilters;
import org.example.strongauto.persistence.model.projections.VehicleEmbeddedProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Vehicle repository.
 */
@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

  @Query("""
      select vehicle from Vehicle vehicle
      left join vehicle.make vehicleMake
      left join vehicle.model vehicleModel
      where
        (:#{#filters.make} is null or (vehicle.make is not null and vehicle.make.make = :#{#filters.make})) and
        (:#{#filters.model} is null or (vehicle.model is not null and vehicle.model.model = :#{#filters.model})) and
        (:#{#filters.fuelType} is null or (vehicle.fuelType is not null and vehicle.fuelType = :#{#filters.fuelType})) and
        (:#{#filters.condition} is null or (vehicle.condition is not null and vehicle.condition = :#{#filters.condition})) and
        (:#{#filters.transmission} is null or (vehicle.transmission is not null and vehicle.transmission = :#{#filters.transmission})) and
        (:#{#filters.color} is null or (vehicle.color is not null and vehicle.color = :#{#filters.color})) and
        (:#{#filters.bodyTypes} is null or (vehicle.bodyType is not null and vehicle.bodyType in (:#{#filters.bodyTypes}))) and
        (:#{#filters.states} is null or (vehicle.state is not null and vehicle.state in (:#{#filters.states}))) and
        (:#{#filters.mileageFrom} is null or (vehicle.mileage is not null and vehicle.mileage >= :#{#filters.mileageFrom})) and
        (:#{#filters.mileageTo} is null or (vehicle.mileage is not null and vehicle.mileage <= :#{#filters.mileageTo})) and
        (:#{#filters.yearFrom} is null or (vehicle.year is not null and vehicle.year >= :#{#filters.yearFrom})) and
        (:#{#filters.yearTo} is null or (vehicle.year is not null and vehicle.year <= :#{#filters.yearTo})) and
        (:#{#filters.priceFrom} is null or (vehicle.totalAmount is not null and vehicle.totalAmount >= :#{#filters.priceFrom})) and
        (:#{#filters.priceTo} is null or (vehicle.totalAmount is not null and vehicle.totalAmount <= :#{#filters.priceTo}))
      """)
  Page<VehicleEmbeddedProjection> findAllBy(VehicleFilters filters, Pageable pageable);
}
