package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.LocalizedText;
import org.example.strongauto.persistence.model.LocalizedTextList;
import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.VehicleFeature;
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
import org.example.strongauto.persistence.model.relations.VehicleFeatureRef;
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

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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

  @Autowired
  private VehicleFeatureRefRepository vehicleFeatureRefRepository;

  @Autowired
  private LocalizedTextListRepository localizedTextListRepository;

  private Vehicle createVehicle(
      LocalizedTextList title, VehicleMake make, VehicleModel model, Set<VehicleFeature> features) {

    Vehicle vehicle = new Vehicle();
    vehicle.setTitle(title);
    vehicle.setMake(make);
    vehicle.setModel(model);
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
    vehicle.setFeatures(features);

    return vehicle;
  }

  private VehicleMake createVehicleMake(String make, Set<VehicleModel> models) {

    VehicleMake vehicleMake = new VehicleMake();
    vehicleMake.setMake(make);
    vehicleMake.setModels(models);

    return vehicleMake;
  }

  private LocalizedText createLocalizedText(String text, Language language) {

    LocalizedText localizedText = new LocalizedText();
    localizedText.setText(text);
    localizedText.setLanguage(language);

    return localizedText;
  }

  /** See method name. */
  @Test
  void shouldUpdateVehicleFeatures() {

    // Given
    VehicleModel audiB8 = new VehicleModel();
    audiB8.setModel("B8");

    VehicleModel audiB9 = new VehicleModel();
    audiB9.setModel("B9");

    VehicleMake audi = createVehicleMake("AUDI", Set.of(audiB8, audiB9));

    vehicleMakeRepository.saveAllAndFlush(Set.of(audi));

    LocalizedTextList feature1LocalizedTextList = new LocalizedTextList();
    feature1LocalizedTextList.setTextList(new HashSet<>(Set.of(createLocalizedText("feature1Mk", Language.MK))));

    VehicleFeature vehicleFeature1 = new VehicleFeature();
    vehicleFeature1.setGroupKey("group1");
    vehicleFeature1.setFeatureKey("feature1");
    vehicleFeature1.setGroupName(feature1LocalizedTextList);
    vehicleFeature1.setFeatureName(feature1LocalizedTextList);

    VehicleFeature vehicleFeature2 = new VehicleFeature();
    vehicleFeature2.setGroupKey("group2");
    vehicleFeature2.setFeatureKey("feature2");
    vehicleFeature2.setGroupName(feature1LocalizedTextList);
    vehicleFeature2.setFeatureName(feature1LocalizedTextList);

    LocalizedTextList title = new LocalizedTextList();
    title.setTextList(new HashSet<>(Set.of(createLocalizedText("Audi B8 2.0 TDI", Language.MK))));

    Set<VehicleFeature> vehicleFeatures = new HashSet<>();
    vehicleFeatures.add(vehicleFeature1);
    vehicleFeatures.add(vehicleFeature2);

    Vehicle saved = vehicleRepository.saveAndFlush(createVehicle(title, audi, audiB8, vehicleFeatures));

    Vehicle updateModel = createVehicle(title, audi, audiB8, new HashSet<>(Set.of(vehicleFeature2)));
    updateModel.setId(saved.getId());

    // When
    Vehicle updated = vehicleRepository.saveAndFlush(updateModel);

    // Then
    Vehicle foundUpdated = vehicleRepository.findById(updated.getId()).orElseThrow();
    Optional<VehicleFeatureRef> vehicleFeatureRef1 = findVehicleFeatureRef(foundUpdated, vehicleFeature1);
    Optional<VehicleFeatureRef> vehicleFeatureRef2 = findVehicleFeatureRef(foundUpdated, vehicleFeature2);

    assertThat(foundUpdated).isNotNull();
    assertThat(foundUpdated.getFeatures()).hasSize(1);
    assertThat(vehicleFeatureRef1).isEmpty();
    assertThat(vehicleFeatureRef2).isPresent();
  }

  Optional<VehicleFeatureRef> findVehicleFeatureRef(Vehicle vehicle, VehicleFeature vehicleFeature) {

    VehicleFeatureRef.Id vehicleFeatureRefId = new VehicleFeatureRef.Id();
    vehicleFeatureRefId.setVehicle(vehicle);
    vehicleFeatureRefId.setVehicleFeature(vehicleFeature);

    return vehicleFeatureRefRepository.findById(vehicleFeatureRefId);
  }

  /** See method name. */
  @Test
  void shouldCreateVehicle() {

    // Given
    VehicleModel audiB8 = new VehicleModel();
    audiB8.setModel("B8");

    VehicleModel audiB9 = new VehicleModel();
    audiB9.setModel("B9");

    VehicleMake audi = createVehicleMake("AUDI", Set.of(audiB8, audiB9));
    vehicleMakeRepository.saveAllAndFlush(Set.of(audi));

    LocalizedText titleMK = createLocalizedText("Audi B8 2.0 TDI", Language.MK);
    LocalizedTextList title = new LocalizedTextList();
    title.setTextList(Set.of(titleMK));

    LocalizedTextList feature1LocalizedTextList = new LocalizedTextList();
    feature1LocalizedTextList.setTextList(Set.of(createLocalizedText("feature1Mk", Language.MK)));

    VehicleFeature vehicleFeature1 = new VehicleFeature();
    vehicleFeature1.setGroupKey("group1");
    vehicleFeature1.setFeatureKey("feature1");
    vehicleFeature1.setGroupName(feature1LocalizedTextList);
    vehicleFeature1.setFeatureName(feature1LocalizedTextList);

    VehicleFeature vehicleFeature2 = new VehicleFeature();
    vehicleFeature2.setGroupKey("group1");
    vehicleFeature2.setFeatureKey("feature1");
    vehicleFeature2.setGroupName(feature1LocalizedTextList);
    vehicleFeature2.setFeatureName(feature1LocalizedTextList);

    Vehicle vehicle = createVehicle(title, audi, audiB8, Set.of(vehicleFeature1, vehicleFeature2));
    vehicle.setDescription(title);
    vehicle.setSummary(title);

    // When
    Vehicle saved = vehicleRepository.saveAndFlush(vehicle);

    // Then
    Optional<Vehicle> found = vehicleRepository.findById(saved.getId());
    assertThat(found).isPresent();

    assertThat(saved.getTitle().getTextList()).hasSize(1)
        .first()
        .returns(titleMK.getText(), LocalizedText::getText);

    assertThat(saved.getDescription().getTextList()).hasSize(1)
        .first()
        .returns(titleMK.getText(), LocalizedText::getText);

    assertThat(saved.getSummary().getTextList()).hasSize(1)
        .first()
        .returns(titleMK.getText(), LocalizedText::getText);

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
    VehicleMake audi = createVehicleMake("AUDI", Set.of(audiB8, audiB9));

    VehicleModel bmwX1 = new VehicleModel();
    bmwX1.setModel("X1");
    VehicleMake bmw = createVehicleMake("BMW", Set.of(bmwX1));

    vehicleMakeRepository.saveAllAndFlush(Set.of(audi, bmw));

    LocalizedText titleMK = createLocalizedText("Audi B8 2.0 TDI", Language.MK);
    LocalizedTextList title = new LocalizedTextList();
    title.setTextList(Set.of(titleMK));

    Vehicle vehicle1 = createVehicle(title, audi, audiB8, null);

    Vehicle vehicle2 = createVehicle(title, audi, audiB9, null);
    vehicle2.setYear(2014);

    Vehicle vehicle3 = createVehicle(title, bmw, bmwX1, null);
    vehicle3.setState(VehicleState.FEATURED);
    vehicle3.setBodyType(VehicleBodyType.SUV);
    vehicle3.setYear(2023);

    Vehicle vehicle4 = createVehicle(title, null, null, null);
    vehicle4.setState(VehicleState.FEATURED);
    vehicle4.setBodyType(VehicleBodyType.TRUCK);
    vehicle4.setYear(2023);

    vehicleRepository.saveAllAndFlush(Set.of(vehicle1, vehicle2, vehicle3, vehicle4));

    Pageable pageable = PageRequest.of(0, 100);

    // When
    Page<VehicleEmbeddedProjection> filtered = vehicleRepository.findAllBy(filters, pageable);

    // Then
    assertEquals(expected, filtered.getContent().size());
  }
}
