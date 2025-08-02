package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.VehicleFeatureDto;
import org.example.strongauto.core.spi.PersistenceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleFeatureService {

  private final PersistenceService persistenceService;

  public List<VehicleFeatureDto> findVehicleFeatures() {
    return persistenceService.getVehicleFeatures();
  }

  public VehicleFeatureDto findByGroupKeyAndFeatureKey(String groupKey, String featureKey) {
    return persistenceService.getVehicleFeature(groupKey, featureKey);
  }

  public void createVehicleFeature(VehicleFeatureDto vehicleFeatureDto) {

    persistenceService.createVehicleFeature(vehicleFeatureDto);
  }

  public void updateVehicleFeature(Long id, VehicleFeatureDto vehicleFeatureDto) {
    persistenceService.updateVehicleFeature(id, vehicleFeatureDto);
  }

  public void deleteVehicleFeature(Long id) {
    persistenceService.deleteVehicleFeature(id);
  }
}
