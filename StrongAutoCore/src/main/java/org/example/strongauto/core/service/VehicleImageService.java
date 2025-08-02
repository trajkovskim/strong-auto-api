package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.ImageDto;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.spi.PersistenceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleImageService {

  private final PersistenceService persistenceService;

  public ImageDto findById(Long id) {
    return persistenceService.getVehicleImage(id);
  }

  public PageInfoDto<ImageDto> findAllPageable(Long vehicleId, Integer pageNumber, Integer pageSize, List<String> sortBy) {
    return persistenceService.getVehicleImages(vehicleId, pageNumber, pageSize, sortBy);
  }
}
