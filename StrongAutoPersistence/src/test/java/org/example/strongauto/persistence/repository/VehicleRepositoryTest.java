package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.LocalizedText;
import org.example.strongauto.persistence.model.LocalizedTextList;
import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.VehicleMake;
import org.example.strongauto.persistence.model.VehicleModel;
import org.example.strongauto.persistence.model.enums.Color;
import org.example.strongauto.persistence.model.enums.Currency;
import org.example.strongauto.persistence.model.enums.Language;
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
import org.junit.jupiter.api.Test;
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
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
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

  /** See method name. */
  @Test
  void shouldCreateVehicle() {

    // Given
    VehicleModel audiB8 = new VehicleModel();
    audiB8.setModel("B8");

    VehicleModel audiB9 = new VehicleModel();
    audiB9.setModel("B9");

    VehicleMake audi = new VehicleMake();
    audi.setMake("AUDI");
    audi.setModels(List.of(audiB8, audiB9));

    vehicleMakeRepository.saveAllAndFlush(List.of(audi));

    LocalizedText descriptionMK = new LocalizedText();
    descriptionMK.setText("Audi B8 2.0 TDI");
    descriptionMK.setLanguage(Language.MK);

    LocalizedTextList description = new LocalizedTextList();
    description.setTextList(List.of(descriptionMK));

    Vehicle vehicle = new Vehicle();
    vehicle.setTitle(description);
    vehicle.setDescription(description);
    vehicle.setSummary(description);
    vehicle.setMake(audi);
    vehicle.setModel(audiB8);
    vehicle.setState(VehicleState.SOLD);
    vehicle.setCondition(VehicleCondition.NEW);
    vehicle.setTransmission(VehicleTransmission.AUTOMATIC);
    vehicle.setBodyType(VehicleBodyType.SEDAN);
    vehicle.setDriveType(VehicleDriveType._2WD_FWD);
    vehicle.setFuelType(VehicleFuelType.DIESEL);
    vehicle.setEngineSize("2.0");
    vehicle.setYear(2010);
    vehicle.setMileage(150000);
    vehicle.setDoors(4);
    vehicle.setTotalAmount(10000.0);
    vehicle.setCurrency(Currency.EUR);
    vehicle.setColor(Color.BLACK);

    // When
    Vehicle saved = vehicleRepository.saveAndFlush(vehicle);

    // Then
    Optional<Vehicle> found = vehicleRepository.findById(saved.getId());
    assertThat(found).isPresent();

    assertThat(saved.getTitle().getTextList()).hasSize(1)
        .first()
        .returns(descriptionMK.getText(), LocalizedText::getText);

    assertThat(saved.getDescription().getTextList()).hasSize(1)
        .first()
        .returns(descriptionMK.getText(), LocalizedText::getText);

    assertThat(saved.getSummary().getTextList()).hasSize(1)
        .first()
        .returns(descriptionMK.getText(), LocalizedText::getText);

    assertThat(saved.getMake()).isNotNull().returns(audi.getMake(), VehicleMake::getMake);

    assertThat(saved.getModel()).isNotNull().returns(audiB8.getModel(), VehicleModel::getModel);

    assertThat(saved).returns(vehicle.getState(), Vehicle::getState)
        .returns(vehicle.getCondition(), Vehicle::getCondition)
        .returns(vehicle.getTransmission(), Vehicle::getTransmission)
        .returns(vehicle.getBodyType(), Vehicle::getBodyType)
        .returns(vehicle.getFuelType(), Vehicle::getFuelType)
        .returns(vehicle.getEngineSize(), Vehicle::getEngineSize)
        .returns(vehicle.getYear(), Vehicle::getYear)
        .returns(vehicle.getMileage(), Vehicle::getMileage)
        .returns(vehicle.getDoors(), Vehicle::getDoors)
        .returns(vehicle.getTotalAmount(), Vehicle::getTotalAmount)
        .returns(vehicle.getCurrency(), Vehicle::getCurrency)
        .returns(vehicle.getColor(), Vehicle::getColor);
  }

  private static Stream<Arguments> vehicleFilters() {

    IntervalFilter<Integer> to2019 = new IntervalFilter<>();
    to2019.setTo(2019);

    IntervalFilter<Integer> from2019 = new IntervalFilter<>();
    from2019.setFrom(2019);

    IntervalFilter<Integer> from2010 = new IntervalFilter<>();
    from2010.setFrom(2010);

    VehicleFilters to2019Filter = new VehicleFilters();
    to2019Filter.setYear(to2019);

    VehicleFilters stateSoldFilter = new VehicleFilters();
    stateSoldFilter.setStates(List.of(VehicleState.SOLD));

    VehicleFilters stateSoldTo2019Filter = new VehicleFilters();
    stateSoldTo2019Filter.setStates(List.of(VehicleState.SOLD));
    stateSoldTo2019Filter.setYear(to2019);

    VehicleFilters from2019Filter = new VehicleFilters();
    from2019Filter.setYear(from2019);

    VehicleFilters from2010Filter = new VehicleFilters();
    from2010Filter.setYear(from2010);

    VehicleFilters from2010AudiFilter = new VehicleFilters();
    from2010AudiFilter.setYear(from2010);
    from2010AudiFilter.setMake("AUDI");

    VehicleFilters from2010AudiB8Filter = new VehicleFilters();
    from2010AudiB8Filter.setYear(from2010);
    from2010AudiB8Filter.setMake("AUDI");
    from2010AudiB8Filter.setModel("B8");

    VehicleFilters bodyTypeSUV_TRUCKFilter = new VehicleFilters();
    bodyTypeSUV_TRUCKFilter.setBodyTypes(List.of(VehicleBodyType.SUV, VehicleBodyType.TRUCK));

    VehicleFilters BMWFilter = new VehicleFilters();
    BMWFilter.setMake("BMW");

    VehicleFilters noFilters = new VehicleFilters();

    return Stream.of(arguments(to2019Filter, 2),
        arguments(stateSoldFilter, 2),
        arguments(stateSoldTo2019Filter, 2),
        arguments(from2019Filter, 2),
        arguments(from2010Filter, 4),
        arguments(from2010AudiFilter, 2),
        arguments(from2010AudiB8Filter, 1),
        arguments(bodyTypeSUV_TRUCKFilter, 2),
        arguments(BMWFilter, 1),
        arguments(noFilters, 4));
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

    LocalizedText descriptionMK = new LocalizedText();
    descriptionMK.setText("Audi B8 2.0 TDI");
    descriptionMK.setLanguage(Language.MK);

    LocalizedTextList description = new LocalizedTextList();
    description.setTextList(List.of(descriptionMK));

    Vehicle vehicle1 = new Vehicle();
    vehicle1.setTitle(description);
    vehicle1.setDescription(description);
    vehicle1.setSummary(description);
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
    vehicle2.setTitle(description);
    vehicle2.setDescription(description);
    vehicle2.setSummary(description);
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
    vehicle3.setTitle(description);
    vehicle3.setDescription(description);
    vehicle3.setSummary(description);
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

    Vehicle vehicle4 = new Vehicle();
    vehicle4.setTitle(description);
    vehicle4.setDescription(description);
    vehicle4.setSummary(description);
    vehicle4.setState(VehicleState.FEATURED);
    vehicle4.setCondition(VehicleCondition.NEW);
    vehicle4.setTransmission(VehicleTransmission.AUTOMATIC);
    vehicle4.setBodyType(VehicleBodyType.TRUCK);
    vehicle4.setDriveType(VehicleDriveType._2WD_FWD);
    vehicle4.setFuelType(VehicleFuelType.DIESEL);
    vehicle4.setEngineSize("2.0");
    vehicle4.setYear(2023);
    vehicle4.setMileage(150000);
    vehicle4.setDoors(4);
    vehicle4.setTotalAmount(10000.0);
    vehicle4.setCurrency(Currency.EUR);
    vehicle4.setColor(Color.BLACK);

    vehicleRepository.saveAllAndFlush(List.of(vehicle1, vehicle2, vehicle3, vehicle4));

    Pageable pageable = PageRequest.of(0, 100);

    // When
    Page<Vehicle> all = vehicleRepository.findAll(pageable);
    Page<VehicleEmbeddedProjection> filtered = vehicleRepository.findAllBy(filters, pageable);

    // Then
    assertEquals(expected, filtered.getContent().size());
  }
}
