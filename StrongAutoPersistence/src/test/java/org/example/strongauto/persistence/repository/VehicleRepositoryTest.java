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
import org.example.strongauto.persistence.model.filters.IntervalFilter;
import org.example.strongauto.persistence.model.filters.VehicleFilters;
import org.example.strongauto.persistence.model.projections.VehicleEmbeddedProjection;
import org.example.strongauto.persistence.repository.configuration.RepositoryTestConfiguration;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.params.provider.Arguments.arguments;

/**
 * Test class for {@link VehicleRepository}.
 */
@DataJpaTest
@ContextConfiguration(classes = RepositoryTestConfiguration.class)
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class VehicleRepositoryTest {

  @Autowired
  private VehicleRepository vehicleRepository;

  @Autowired
  private VehicleMakeRepository vehicleMakeRepository;

  private static Stream<Arguments> vehicleFilters() {

    IntervalFilter<Integer> to2019 = new IntervalFilter<>();
    to2019.setTo(2019);

    IntervalFilter<Integer> from2019 = new IntervalFilter<>();
    from2019.setFrom(2019);

    IntervalFilter<Integer> yearIntervalFilter3 = new IntervalFilter<>();
    yearIntervalFilter3.setFrom(2010);

    VehicleFilters vehicleFilters1 = new VehicleFilters();
    vehicleFilters1.setYear(to2019);

    VehicleFilters vehicleFilters2 = new VehicleFilters();
    vehicleFilters2.setStates(List.of(VehicleState.SOLD));

    VehicleFilters vehicleFilters3 = new VehicleFilters();
    vehicleFilters3.setStates(List.of(VehicleState.SOLD));
    vehicleFilters3.setYear(to2019);

    VehicleFilters vehicleFilters4 = new VehicleFilters();
    vehicleFilters4.setYear(from2019);

    VehicleFilters vehicleFilters5 = new VehicleFilters();
    vehicleFilters5.setYear(yearIntervalFilter3);

    VehicleFilters vehicleFilters6 = new VehicleFilters();
    vehicleFilters6.setYear(yearIntervalFilter3);
    vehicleFilters6.setMake("AUDI");

    VehicleFilters vehicleFilters7 = new VehicleFilters();
    vehicleFilters7.setYear(yearIntervalFilter3);
    vehicleFilters7.setMake("AUDI");
    vehicleFilters7.setModel("B8");

    VehicleFilters vehicleFilters8 = new VehicleFilters();
    vehicleFilters8.setBodyTypes(List.of(VehicleBodyType.SUV));

    VehicleFilters noFilters = new VehicleFilters();

    return Stream.of(
        arguments(vehicleFilters1, 2),
        arguments(vehicleFilters2, 2),
        arguments(vehicleFilters3, 2),
        arguments(vehicleFilters4, 1),
        arguments(vehicleFilters5, 3),
        arguments(vehicleFilters6, 2),
        arguments(vehicleFilters7, 1),
        arguments(vehicleFilters8, 1),
        arguments(noFilters, 3));
  }

  /** See method name. */
  @ParameterizedTest
  @MethodSource("vehicleFilters")
  void shouldFindAllByFilters(VehicleFilters filters, int expected) {

    // Given
    VehicleModel audiB8 = new VehicleModel();
    audiB8.setModel("B8");

    VehicleModel audiB9 = new VehicleModel();
    audiB9.setModel("B9");

    VehicleMake audi = new VehicleMake();
    audi.setMake("AUDI");
    audi.setModels(List.of(audiB8, audiB9));

    VehicleModel bmwX1 = new VehicleModel();
    bmwX1.setModel("X1");

    VehicleMake bmw = new VehicleMake();
    bmw.setMake("BMW");
    bmw.setModels(List.of(bmwX1));

    vehicleMakeRepository.saveAllAndFlush(List.of(audi, bmw));

    Vehicle vehicle1 = new Vehicle();
    vehicle1.setTitle("Audi B8 2.0 TDI");
    vehicle1.setDescription("Audi B8 2.0 TDI");
    vehicle1.setSummary("Audi B8 2.0 TDI");
    vehicle1.setMake(audi);
    vehicle1.setModel(audiB8);
    vehicle1.setState(VehicleState.SOLD);
    vehicle1.setCondition(VehicleCondition.NEW);
    vehicle1.setTransmission(VehicleTransmission.AUTOMATIC);
    vehicle1.setBodyType(VehicleBodyType.SEDAN);
    vehicle1.setDriveType(VehicleDriveType._2WD_FWD);
    vehicle1.setFuelType(VehicleFuelType.DIESEL);
    vehicle1.setEngineSize("2.0");
    vehicle1.setYear(2010);
    vehicle1.setMileage(150000);
    vehicle1.setDoors(4);
    vehicle1.setTotalAmount(10000.0);
    vehicle1.setCurrency(Currency.EUR);
    vehicle1.setColor(Color.BLACK);

    Vehicle vehicle2 = new Vehicle();
    vehicle2.setTitle("Audi B9 2.0 TDI");
    vehicle2.setDescription("Audi B9 2.0 TDI");
    vehicle2.setSummary("Audi B9 2.0 TDI");
    vehicle2.setMake(audi);
    vehicle2.setModel(audiB9);
    vehicle2.setState(VehicleState.SOLD);
    vehicle2.setCondition(VehicleCondition.NEW);
    vehicle2.setTransmission(VehicleTransmission.AUTOMATIC);
    vehicle2.setBodyType(VehicleBodyType.SEDAN);
    vehicle2.setDriveType(VehicleDriveType._2WD_FWD);
    vehicle2.setFuelType(VehicleFuelType.DIESEL);
    vehicle2.setEngineSize("2.0");
    vehicle2.setYear(2014);
    vehicle2.setMileage(150000);
    vehicle2.setDoors(4);
    vehicle2.setTotalAmount(10000.0);
    vehicle2.setCurrency(Currency.EUR);
    vehicle2.setColor(Color.BLACK);

    Vehicle vehicle3 = new Vehicle();
    vehicle3.setTitle("BMW X1");
    vehicle3.setDescription("BMW X1");
    vehicle3.setSummary("BMW X1");
    vehicle3.setMake(bmw);
    vehicle3.setModel(bmwX1);
    vehicle3.setState(VehicleState.FEATURED);
    vehicle3.setCondition(VehicleCondition.NEW);
    vehicle3.setTransmission(VehicleTransmission.AUTOMATIC);
    vehicle3.setBodyType(VehicleBodyType.SUV);
    vehicle3.setDriveType(VehicleDriveType._2WD_FWD);
    vehicle3.setFuelType(VehicleFuelType.DIESEL);
    vehicle3.setEngineSize("2.0");
    vehicle3.setYear(2023);
    vehicle3.setMileage(150000);
    vehicle3.setDoors(4);
    vehicle3.setTotalAmount(10000.0);
    vehicle3.setCurrency(Currency.EUR);
    vehicle3.setColor(Color.BLACK);

    vehicleRepository.saveAllAndFlush(List.of(vehicle1, vehicle2, vehicle3));

    Pageable pageable = PageRequest.of(0, 100);

    // When
    Page<VehicleEmbeddedProjection> filtered = vehicleRepository.findAllBy(filters, pageable);

    // Then
    assertEquals(expected, filtered.getContent().size());
  }
}
