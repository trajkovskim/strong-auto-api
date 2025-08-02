package org.example.strongauto.persistence.adapter.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.persistence.utils.LocalizedTextUtil;
import org.example.strongauto.persistence.utils.PageUtils;
import org.example.strongauto.persistence.converter.VehicleConverter;
import org.example.strongauto.core.exception.VehicleFeaturesMissingException;
import org.example.strongauto.core.exception.VehicleModelNotPresentInMakeException;
import org.example.strongauto.core.exception.VehicleNotFoundException;
import org.example.strongauto.core.model.dto.*;
import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.VehicleFeature;
import org.example.strongauto.persistence.model.filters.VehicleFilters;
import org.example.strongauto.persistence.model.projections.VehicleEmbeddedProjection;
import org.example.strongauto.persistence.repository.VehicleFeatureRepository;
import org.example.strongauto.persistence.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class VehiclePersistenceService {

  private final VehicleMakePersistenceService vehicleMakeService;
  private final VehicleFeatureRepository vehicleFeatureRepository;

  private final VehicleRepository vehicleRepository;

  private final VehicleConverter vehicleConverter;
  private final LocalizedTextUtil localizedTextUtil;

  public VehicleDto getVehicle(Long id) {

    final Vehicle vehicle = getById(id);

    return vehicleConverter.convertVehicle(vehicle);
  }

  public PageInfoDto<VehicleEmbeddedDto> getVehicles(
      VehicleFiltersDto vehicleFiltersDto, Integer pageNumber, Integer pageSize, List<String> sortBy) {

    VehicleFilters vehicleFilters = vehicleConverter.convertVehicleFilters(vehicleFiltersDto);
    Pageable pageRequest = PageUtils.createPageRequest(pageNumber, pageSize, sortBy);

    final Page<VehicleEmbeddedProjection> page = vehicleRepository.findAllBy(vehicleFilters, pageRequest);

    Collection<VehicleEmbeddedDto> items = page.get().map(vehicleConverter::convertVehicle).toList();

    return PageInfoDto.<VehicleEmbeddedDto>builder()
        .totalPages(page.getTotalPages())
        .totalElements(page.getTotalElements())
        .pageSize(page.getSize())
        .pageNumber(page.getNumber())
        .items(items)
        .build();
  }

  private Optional<VehicleModelDto> getModelFromMake(VehicleMakeDto make, String model) {

    return make.getModels().stream().filter(makeModel -> model.equals(makeModel.getModel())).findFirst();
  }

  private VehicleDto finalizeVehicle(VehicleDto vehicleDto) {

    VehicleVariantDto variantDto = vehicleDto.getVariant();

    VehicleMakeDto vehicleMakeDto = variantDto.getMake();

    if (vehicleMakeDto == null) {
      return vehicleDto;
    }

    VehicleMakeDto foundVehicleMakeDto = vehicleMakeService.findByMakeName(vehicleMakeDto.getMake());
    VehicleModelDto vehicleModelDto = variantDto.getModel();

    VehicleVariantDto updatedVariant;
    if(vehicleModelDto == null) {

      updatedVariant = variantDto.toBuilder()
          .make(foundVehicleMakeDto)
          .build();
    }

    VehicleModelDto foundVehicleModelDto = getModelFromMake(foundVehicleMakeDto, vehicleModelDto.getModel())
        .orElseThrow(() -> new VehicleModelNotPresentInMakeException(
            "Model %s not present in %s".formatted(foundVehicleMakeDto.getMake(), vehicleModelDto.getModel())));

    updatedVariant = variantDto.toBuilder()
        .make(foundVehicleMakeDto)
        .model(foundVehicleModelDto)
        .build();

    return vehicleDto.toBuilder()
        .variant(updatedVariant)
        .build();
  }

  @Transactional
  public Long createVehicle(VehicleDto vehicleDto) {

    VehicleDto finalizedVehicleDto = finalizeVehicle(vehicleDto);

    Vehicle vehicle = vehicleConverter.convertVehicle(finalizedVehicleDto);

    Vehicle savedVehicle = vehicleRepository.save(vehicle);

    return savedVehicle.getId();
  }


  private Vehicle finalizeVehicle(Vehicle vehicle, Vehicle foundVehicle) {

    localizedTextUtil.copyId(foundVehicle.getTitle(), vehicle.getTitle());
    localizedTextUtil.copyId(foundVehicle.getSummary(), foundVehicle.getSummary());
    localizedTextUtil.copyId(foundVehicle.getDescription(), foundVehicle.getDescription());

    return vehicle;
  }

  private Vehicle getById(Long id) {
    return vehicleRepository.findById(id).orElseThrow(() -> new VehicleNotFoundException("Vehicle not found: " + id));
  }

  public Long updateVehicle(Long id, VehicleDto vehicleDto) {

    Vehicle vehicle = vehicleConverter.convertVehicle(vehicleDto);

    Vehicle foundVehicle = getById(id);
    Vehicle finalizedVehicle = finalizeVehicle(vehicle, foundVehicle);

    Set<VehicleFeature> vehicleFeatures = finalizedVehicle.getFeatures();

    if(vehicleFeatures != null) {

      Map<VehicleFeature, Optional<VehicleFeature>> vehicleFeaturesMap = vehicleFeatures.parallelStream()
          .collect(Collectors.toMap(
              vehicleFeature -> vehicleFeature,
              feature -> vehicleFeatureRepository.findByGroupKeyAndFeatureKey(
                  feature.getGroupKey(), feature.getFeatureKey())));

      String missingVehicleFeatures = vehicleFeaturesMap.entrySet()
          .parallelStream()
          .filter(entry -> entry.getValue().isEmpty())
          .map(Map.Entry::getKey)
          .map(feature -> "%s:%s".formatted(feature.getGroupKey(), feature.getFeatureKey()))
          .collect(Collectors.joining(", "));

      if (!missingVehicleFeatures.isEmpty()) {
        throw new VehicleFeaturesMissingException("Vehicle features missing: " + missingVehicleFeatures);
      }

      Set<VehicleFeature> vehicleFeatureEntities =
          vehicleFeaturesMap.values().parallelStream().map(Optional::get).collect(Collectors.toSet());

      finalizedVehicle.setFeatures(vehicleFeatureEntities);
    }

    Vehicle savedVehicle = vehicleRepository.save(finalizedVehicle);

    return savedVehicle.getId();
  }
  public void deleteVehicle(Long id) {

    vehicleRepository.deleteById(id);
  }
}
