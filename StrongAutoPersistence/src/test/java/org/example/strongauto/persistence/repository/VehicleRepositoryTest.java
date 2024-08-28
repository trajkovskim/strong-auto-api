package org.example.strongauto.persistence.repository;


import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.VehicleMake;
import org.example.strongauto.persistence.model.VehicleModel;
import org.example.strongauto.persistence.model.enums.Color;
import org.example.strongauto.persistence.model.enums.Currency;
import org.example.strongauto.persistence.model.enums.VehicleBodyType;
import org.example.strongauto.persistence.model.enums.VehicleCondition;
import org.example.strongauto.persistence.model.enums.VehicleDriveType;
import org.example.strongauto.persistence.model.enums.VehicleFuelType;
import org.example.strongauto.persistence.model.enums.VehicleState;
import org.example.strongauto.persistence.model.enums.VehicleTransmission;
import org.example.strongauto.persistence.model.filters.VehicleFilters;
import org.example.strongauto.persistence.model.projections.VehicleEmbeddedProjection;
import org.example.strongauto.persistence.repository.configuration.RepositoryTestConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for {@link VehicleRepository}.
 */
@DataJpaTest
@ContextConfiguration(classes = RepositoryTestConfiguration.class)
@ActiveProfiles("test")
public class VehicleRepositoryTest {

  @Autowired
  private VehicleRepository vehicleRepository;

  @Autowired
  private VehicleMakeRepository vehicleMakeRepository;

  /** See method name. */
  @Test
  void shouldFindAllByFilters() {

    // Given
    VehicleModel vehicleModel = new VehicleModel();
    vehicleModel.setModel("B8");

    VehicleMake vehicleMake = new VehicleMake();
    vehicleMake.setMake("AUDI");
    vehicleMake.setModels(List.of(vehicleModel));

    vehicleMakeRepository.saveAndFlush(vehicleMake);

    Vehicle vehicle1 = new Vehicle();
    vehicle1.setTitle("Audi 2.0 TDI");
    vehicle1.setDescription("Audi 2.0 TDI");
    vehicle1.setSummary("Audi 2.0 TDI");
    vehicle1.setMake(vehicleMake);
    vehicle1.setModel(vehicleModel);
    vehicle1.setState(VehicleState.SOLD);
    vehicle1.setCondition(VehicleCondition.NEW);
    vehicle1.setTransmission(VehicleTransmission.AUTOMATIC);
    vehicle1.setBodyType(VehicleBodyType.SEDAN);
    vehicle1.setDriveType(VehicleDriveType._2WD_FWD);
    vehicle1.setFuelType(VehicleFuelType.DIESEL);
    vehicle1.setEngineSize("2.0");
    vehicle1.setYear(2014);
    vehicle1.setMileage(150000);
    vehicle1.setDoors(4);
    vehicle1.setAmount(10000.0);
    vehicle1.setCurrency(Currency.EUR);
    vehicle1.setColor(Color.BLACK);

    Vehicle vehicle2 = new Vehicle();
    vehicle2.setTitle("Audi 2.0 TDI");
    vehicle2.setDescription("Audi 2.0 TDI");
    vehicle2.setSummary("Audi 2.0 TDI");
    vehicle2.setMake(vehicleMake);
    vehicle2.setModel(vehicleModel);
    vehicle2.setState(VehicleState.FEATURED);
    vehicle2.setCondition(VehicleCondition.NEW);
    vehicle2.setTransmission(VehicleTransmission.AUTOMATIC);
    vehicle2.setBodyType(VehicleBodyType.SEDAN);
    vehicle2.setDriveType(VehicleDriveType._2WD_FWD);
    vehicle2.setFuelType(VehicleFuelType.DIESEL);
    vehicle2.setEngineSize("2.0");
    vehicle2.setYear(2014);
    vehicle2.setMileage(150000);
    vehicle2.setDoors(4);
    vehicle2.setAmount(10000.0);
    vehicle2.setCurrency(Currency.EUR);
    vehicle2.setColor(Color.BLACK);

    vehicleRepository.saveAllAndFlush(List.of(vehicle1, vehicle2));

    VehicleFilters vehicleFilters = new VehicleFilters();
    vehicleFilters.setStates(List.of(VehicleState.SOLD));

    Pageable pageable = PageRequest.of(1, 10);

    // When
    Page<VehicleEmbeddedProjection> filtered = vehicleRepository.findAllBy(vehicleFilters, pageable);

    // Then
    assertEquals(1, filtered.getContent().size());
  }
}
