package org.example.strongauto.core.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.converter.VehicleConverter;
import org.example.strongauto.core.converter.VehicleMakeConverter;
import org.example.strongauto.core.exception.VehicleMakeNotFoundException;
import org.example.strongauto.core.exception.VehicleModelNotPresentInMakeException;
import org.example.strongauto.core.exception.VehicleNotFoundException;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleDto;
import org.example.strongauto.core.model.dto.VehicleEmbeddedDto;
import org.example.strongauto.core.model.dto.VehicleFiltersDto;
import org.example.strongauto.core.model.dto.VehicleMakeDto;
import org.example.strongauto.core.model.dto.VehicleMakeEmbeddedDto;
import org.example.strongauto.core.model.dto.VehicleModelDto;
import org.example.strongauto.core.utils.PageUtils;
import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.VehicleMake;
import org.example.strongauto.persistence.model.filters.VehicleFilters;
import org.example.strongauto.persistence.model.projections.VehicleEmbeddedProjection;
import org.example.strongauto.persistence.repository.VehicleMakeRepository;
import org.example.strongauto.persistence.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Service
public class VehicleService {

  private final VehicleRepository vehicleRepository;
  private final VehicleMakeRepository vehicleMakeRepository;

  private final VehicleConverter vehicleConverter;
  private final VehicleMakeConverter vehicleMakeConverter;

  public VehicleDto findById(Long id) {
    final Vehicle vehicle = vehicleRepository
        .findById(id)
        .orElseThrow(() -> new VehicleNotFoundException("Vehicle not found: " + id));

    return vehicleConverter.convertVehicle(vehicle);
  }

  public PageInfoDto<VehicleEmbeddedDto> findAllPageable(
      VehicleFiltersDto vehicleFiltersDto, Integer pageNumber, Integer pageSize, List<String> sortBy) {

    VehicleFilters vehicleFilters = vehicleConverter.convertVehicleFilters(vehicleFiltersDto);
    Pageable pageRequest = PageUtils.createPageRequest(pageNumber, pageSize, sortBy);

    final Page<VehicleEmbeddedProjection> page = vehicleRepository.findAllBy(vehicleFilters, pageRequest);

    Collection<VehicleEmbeddedDto> items = page
        .get()
        .map(vehicleConverter::convertVehicle)
        .toList();

    return PageInfoDto.<VehicleEmbeddedDto>builder()
        .pageNumber(page.getNumber())
        .totalPages(page.getTotalPages())
        .items(items)
        .build();
  }

  VehicleDto finalizeVehicleDto(VehicleDto vehicleDto) {

    if(vehicleDto.getMake() == null) {
      return vehicleDto;
    }

    VehicleMakeDto foundVehicleMake = findVehicleMakeByMake(vehicleDto.getMake().getMake());

    String vehicleMakeStr = vehicleDto.getMake().getMake();
    String vehicleModelStr = vehicleDto.getModel().getModel();

    VehicleModelDto foundVehicleModel = foundVehicleMake.getModels()
        .stream()
        .filter(model-> vehicleModelStr.equals(model.getModel()))
        .findFirst()
        .orElseThrow(() ->
            new VehicleModelNotPresentInMakeException(
                String.format("Model %s not present in %s", vehicleModelStr, vehicleMakeStr)));

    return vehicleDto.toBuilder()
        .make(foundVehicleMake)
        .model(foundVehicleModel)
        .build();
  }

  public Long createVehicle(VehicleDto vehicleDto) {

    VehicleDto finalizedVehicleDto = finalizeVehicleDto(vehicleDto);

    Vehicle vehicle = vehicleConverter.convertVehicle(finalizedVehicleDto);

    Vehicle savedVehicle = vehicleRepository.save(vehicle);

    return savedVehicle.getId();
  }

  public Long updateVehicle(Long id, VehicleDto vehicleDto) {

    VehicleDto foundVehicle = findById(id);

    VehicleDto vehicleDtoWithId = vehicleDto.toBuilder().id(foundVehicle.getId()).build();

    VehicleDto finalizedVehicleDto = finalizeVehicleDto(vehicleDtoWithId);

    Vehicle vehicle = vehicleConverter.convertVehicle(finalizedVehicleDto);

    Vehicle savedVehicle = vehicleRepository.save(vehicle);

    return savedVehicle.getId();
  }

  public void deleteVehicle(Long id) {

    vehicleRepository.deleteById(id);
  }

  public VehicleMakeDto findVehicleMakeByMake(String make) {

    VehicleMake foundVehicleMake = vehicleMakeRepository
        .findByMake(make)
        .orElseThrow(() -> new VehicleMakeNotFoundException("Vehicle make not found: " + make));

    return vehicleMakeConverter.convertVehicleMake(foundVehicleMake);
  }

  public String createVehicleMake(VehicleMakeDto vehicleMakeDto) {

    VehicleMake vehicleMake = vehicleMakeConverter.convertVehicleMake(vehicleMakeDto);

    VehicleMake savedVehicleMake = vehicleMakeRepository.save(vehicleMake);

    return savedVehicleMake.getMake();
  }

  public String updateVehicleMake(String make, VehicleMakeDto vehicleMakeDto) {

    VehicleMakeDto foundVehicleMake = findVehicleMakeByMake(make);

    VehicleMakeDto vehicleMakeDtoWithId = vehicleMakeDto.toBuilder()
        .id(foundVehicleMake.getId())
        .build();

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
