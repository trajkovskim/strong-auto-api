package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleDto;
import org.example.strongauto.core.model.dto.VehicleEmbeddedDto;
import org.example.strongauto.core.model.dto.VehicleFiltersDto;
import org.example.strongauto.core.spi.PersistenceService;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class VehicleService {

  private final PersistenceService persistenceService;

  public VehicleDto findById(Long id) {
    return persistenceService.getVehicle(id);
  }

  public PageInfoDto<VehicleEmbeddedDto> findAllPageable(
      VehicleFiltersDto vehicleFiltersDto, Integer pageNumber, Integer pageSize, List<String> sortBy) {
    return persistenceService.getVehicles(vehicleFiltersDto, pageNumber, pageSize, sortBy);
  }

  public Long createVehicle(VehicleDto vehicleDto) {
    return persistenceService.createVehicle(vehicleDto);
  }

  public Long updateVehicle(Long id, VehicleDto vehicleDto) {
    return persistenceService.updateVehicle(id, vehicleDto);
  }

  public void deleteVehicle(Long id) {
    persistenceService.deleteVehicle(id);
  }
}
