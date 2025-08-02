package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.VehicleImage;
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
      left join vehicle.variant vehicleVariant
      left join vehicle.variant.make vehicleMake
      left join vehicle.variant.model vehicleModel
      where
        (:#{#filters.make} is null or (vehicle.variant.make is not null and vehicle.variant.make.make = :#{#filters.make})) and
        (:#{#filters.model} is null or (vehicle.variant.model is not null and vehicle.variant.model.model = :#{#filters.model})) and
        (:#{#filters.fuelTypeAsList} is null or (vehicleVariant.fuelType is not null and vehicleVariant.fuelType in (:#{#filters.fuelTypeAsList}))) and
        (:#{#filters.conditionAsList} is null or (vehicle.condition is not null and vehicle.condition in (:#{#filters.conditionAsList}))) and
        (:#{#filters.transmissionAsList} is null or (vehicle.variant.transmission is not null and vehicle.variant.transmission in (:#{#filters.transmissionAsList}))) and
        (:#{#filters.colorAsList} is null or (vehicle.color is not null and vehicle.color in (:#{#filters.colorAsList}))) and
        (:#{#filters.bodyTypes} is null or (vehicleVariant.bodyType is not null and vehicleVariant.bodyType in (:#{#filters.bodyTypes}))) and
        (:#{#filters.states} is null or (vehicle.state is not null and vehicle.state in (:#{#filters.states}))) and
        (:#{#filters.mileageFrom} is null or (vehicle.mileage is not null and vehicle.mileage >= :#{#filters.mileageFrom})) and
        (:#{#filters.mileageTo} is null or (vehicle.mileage is not null and vehicle.mileage <= :#{#filters.mileageTo})) and
        (:#{#filters.yearFrom} is null or (vehicle.year is not null and vehicle.year >= :#{#filters.yearFrom})) and
        (:#{#filters.yearTo} is null or (vehicle.year is not null and vehicle.year <= :#{#filters.yearTo})) and
        (:#{#filters.amountFrom} is null
          or (vehicle.totalPromoAmount is not null and vehicle.totalPromoAmount >= :#{#filters.amountFrom}
              or vehicle.totalAmount is not null and vehicle.totalAmount >= :#{#filters.amountFrom})) and
        (:#{#filters.amountTo} is null
          or (vehicle.totalPromoAmount is not null and vehicle.totalPromoAmount <= :#{#filters.amountTo}
              or vehicle.totalAmount is not null and vehicle.totalAmount <= :#{#filters.amountTo}))
      """)
  Page<VehicleEmbeddedProjection> findAllBy(VehicleFilters filters, Pageable pageable);

  @Query("select vehicle.images from Vehicle vehicle where vehicle.id = :id")
  Page<VehicleImage> findVehicleImagesById(Long id, Pageable pageable);
}
