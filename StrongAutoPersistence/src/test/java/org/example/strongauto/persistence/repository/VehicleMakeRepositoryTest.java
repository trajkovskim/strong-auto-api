package org.example.strongauto.persistence.repository;


import org.example.strongauto.persistence.model.VehicleMake;
import org.example.strongauto.persistence.model.VehicleModel;
import org.example.strongauto.persistence.repository.configuration.RepositoryTestConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for {@link VehicleRepository}.
 */
@DataJpaTest
@ContextConfiguration(classes = RepositoryTestConfiguration.class)
@ActiveProfiles("test")
public class VehicleMakeRepositoryTest {

  @Autowired
  private VehicleMakeRepository vehicleMakeRepository;

  /** See method name. */
  @Test
  void shouldCreateVehicleMake() {

    // Given
    VehicleMake make = new VehicleMake();
    make.setMake("AUDI");

    VehicleModel model1 = new VehicleModel();
    model1.setModel("B8");

    VehicleModel model2 = new VehicleModel();
    model2.setModel("B9");

    Set<VehicleModel> models = Set.of(model1, model2);
    make.setModels(models);

    // When
    VehicleMake savedVehicleMake = vehicleMakeRepository.saveAndFlush(make);

    // Then
    Optional<VehicleMake> foundVehicleMake = vehicleMakeRepository.findById(savedVehicleMake.getId());

    assertThat(foundVehicleMake).isPresent();
    assertThat(foundVehicleMake.get().getModels()).hasSize(models.size());
  }

  /** See method name. */
  @Test
  void shouldFindByMake() {

    // Given
    VehicleModel audiB8 = new VehicleModel();
    audiB8.setModel("B8");

    VehicleModel audiB9 = new VehicleModel();
    audiB9.setModel("B9");

    VehicleMake audi = new VehicleMake();
    audi.setMake("AUDI");
    audi.setModels(Set.of(audiB8, audiB9));

    VehicleModel bmwX1 = new VehicleModel();
    bmwX1.setModel("X1");

    VehicleMake bmw = new VehicleMake();
    bmw.setMake("BMW");
    bmw.setModels(Set.of(bmwX1));

    vehicleMakeRepository.saveAllAndFlush(Set.of(audi, bmw));

    // When
    Optional<VehicleMake> foundMake = vehicleMakeRepository.findByMake("AUDI");

    // Then
    assertThat(foundMake).isPresent();
    assertThat(foundMake.get().getModels()).hasSize(audi.getModels().size());
  }
}
