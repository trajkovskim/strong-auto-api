package org.example.strongauto.core.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.converter.VehicleMakeConverter;
import org.example.strongauto.core.exception.VehicleMakeNotFoundException;
import org.example.strongauto.core.model.dto.VehicleMakeDto;
import org.example.strongauto.core.model.dto.VehicleMakeEmbeddedDto;
import org.example.strongauto.persistence.model.VehicleMake;
import org.example.strongauto.persistence.repository.VehicleMakeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Vehicle make service
 */
@RequiredArgsConstructor
@Service
public class VehicleMakeService {

  private final VehicleMakeRepository vehicleMakeRepository;
  private final VehicleMakeConverter vehicleMakeConverter;

  public VehicleMakeDto findByMakeName(String make) {

    VehicleMake foundVehicleMake = vehicleMakeRepository.findByMake(make)
        .orElseThrow(() -> new VehicleMakeNotFoundException("Vehicle make not found: " + make));

    return vehicleMakeConverter.convertVehicleMake(foundVehicleMake);
  }

  public String createVehicleMake(VehicleMakeDto vehicleMakeDto) {

    VehicleMake vehicleMake = vehicleMakeConverter.convertVehicleMake(vehicleMakeDto);

    VehicleMake savedVehicleMake = vehicleMakeRepository.save(vehicleMake);

    return savedVehicleMake.getMake();
  }

  public String updateVehicleMake(String make, VehicleMakeDto vehicleMakeDto) {

    VehicleMakeDto foundVehicleMake = findByMakeName(make);

    VehicleMakeDto vehicleMakeDtoWithId = vehicleMakeDto.toBuilder().id(foundVehicleMake.getId()).build();

    VehicleMake vehicleMake = vehicleMakeConverter.convertVehicleMake(vehicleMakeDtoWithId);

    VehicleMake savedVehicleMake = vehicleMakeRepository.save(vehicleMake);

    return savedVehicleMake.getMake();
  }

  @Transactional
  public void deleteVehicleMake(String make) {

    vehicleMakeRepository.deleteByMake(make);
  }

  public List<VehicleMakeEmbeddedDto> findVehicleMakes() {

    List<VehicleMake> foundVehicleMake = vehicleMakeRepository.findAll();

    return foundVehicleMake.stream().map(vehicleMakeConverter::convertVehicleMakeEmbedded).toList();
  }
}
