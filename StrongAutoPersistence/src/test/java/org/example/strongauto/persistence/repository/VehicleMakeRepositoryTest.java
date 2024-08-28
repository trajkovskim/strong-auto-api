package org.example.strongauto.persistence.repository;


import org.example.strongauto.persistence.model.VehicleMake;
import org.example.strongauto.persistence.model.VehicleModel;
import org.example.strongauto.persistence.repository.configuration.RepositoryTestConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

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

    List<VehicleModel> models = List.of(model1, model2);
    make.setModels(models);

    // When
    VehicleMake savedVehicleMake = vehicleMakeRepository.saveAndFlush(make);

    // Then
    Optional<VehicleMake> foundVehicleMake = vehicleMakeRepository.findById(savedVehicleMake.getId());
    assertTrue(foundVehicleMake.isPresent());
    assertEquals(foundVehicleMake.get().getModels().size(), models.size());
  }
}
