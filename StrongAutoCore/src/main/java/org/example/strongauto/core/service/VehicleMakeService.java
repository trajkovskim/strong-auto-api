package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.VehicleMakeDto;
import org.example.strongauto.core.model.dto.VehicleMakeEmbeddedDto;
import org.example.strongauto.core.spi.PersistenceService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Vehicle make service
 */
@RequiredArgsConstructor
@Service
public class VehicleMakeService {

  private final PersistenceService persistenceService;

  public VehicleMakeDto findByMakeName(String make) {
    return persistenceService.getVehicleMake(make);
  }

  public String createVehicleMake(VehicleMakeDto vehicleMakeDto) {
    return persistenceService.createVehicleMake(vehicleMakeDto);
  }

  public String updateVehicleMake(String make, VehicleMakeDto vehicleMakeDto) {
    return persistenceService.updateVehicleMake(make, vehicleMakeDto);
  }

  public void deleteVehicleMake(String make) {
    persistenceService.deleteVehicleMake(make);
  }

  public List<VehicleMakeEmbeddedDto> findVehicleMakes() {
    return persistenceService.getVehicleMakes();
  }
}
