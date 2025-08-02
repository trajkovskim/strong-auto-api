package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.*;
import org.example.strongauto.core.spi.PersistenceService;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class VehicleVariantService {

  private final PersistenceService persistenceService;

  public VehicleDto getVehicleVariant(Long id) {
    return persistenceService.getVehicle(id);
  }

  public PageInfoDto<VehicleVariantDto> getVehicleVariants(Integer pageNumber, Integer pageSize, List<String> sortBy) {
    return persistenceService.getVehicleVariants(pageNumber, pageSize, sortBy);
  }

  public Long createVehicleVariant(VehicleVariantDto vehicleVariantDto) {
    return persistenceService.createVehicleVariant(vehicleVariantDto);
  }

  public Long updateVehicleVariant(Long id, VehicleVariantDto vehicleVariantDto) {
    return persistenceService.updateVehicleVariant(id, vehicleVariantDto);
  }

  public void deleteVehicleVariant(Long id) {
    persistenceService.deleteVehicleVariant(id);
  }
}
