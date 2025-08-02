package org.example.strongauto.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.exception.EntityNotFoundException;
import org.example.strongauto.core.model.dto.*;
import org.example.strongauto.core.spi.PersistenceService;
import org.example.strongauto.persistence.adapter.service.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class StrongAutoPersistenceAdapter implements PersistenceService {

  private final VehiclePersistenceService vehicleService;
  private final VehicleMakePersistenceService vehicleMakeService;
  private final VehicleFeaturePersistenceService vehicleFeatureService;
  private final VehicleImagePersistenceService vehicleImageService;
  private final VehicleVariantPersistenceService vehicleVariantPersistenceService;

  @Override
  public VehicleDto getVehicle(Long id) {
    return vehicleService.getVehicle(id);
  }

  @Override
  public PageInfoDto<VehicleEmbeddedDto> getVehicles(
      VehicleFiltersDto vehicleFiltersDto, Integer pageNumber, Integer pageSize, List<String> sortBy) {
    return vehicleService.getVehicles(vehicleFiltersDto, pageNumber, pageSize, sortBy);
  }

  @Override
  public Long createVehicle(VehicleDto vehicleDto) {
    return vehicleService.createVehicle(vehicleDto);
  }

  @Override
  public Long updateVehicle(Long id, VehicleDto vehicleDto) {
    return vehicleService.updateVehicle(id, vehicleDto);
  }

  @Override
  public void deleteVehicle(Long id) {
    vehicleService.deleteVehicle(id);
  }

  @Override
  public VehicleMakeDto getVehicleMake(String make) {
    return vehicleMakeService.findByMakeName(make);
  }

  @Override
  public List<VehicleMakeEmbeddedDto> getVehicleMakes() {
    return vehicleMakeService.findVehicleMakes();
  }

  @Override
  public String createVehicleMake(VehicleMakeDto vehicleMakeDto) {
    return vehicleMakeService.createVehicleMake(vehicleMakeDto);
  }

  @Override
  public String updateVehicleMake(String make, VehicleMakeDto vehicleMakeDto) {
    return vehicleMakeService.createVehicleMake(vehicleMakeDto);
  }

  @Override
  public void deleteVehicleMake(String make) {
    vehicleMakeService.deleteVehicleMake(make);
  }

  @Override
  public List<VehicleFeatureDto> getVehicleFeatures() {
    return vehicleFeatureService.getVehicleFeatures();
  }

  @Override
  public VehicleFeatureDto getVehicleFeature(String groupKey, String featureKey) {
    return vehicleFeatureService.getVehicleFeature(groupKey, featureKey)
        .orElseThrow(() -> new EntityNotFoundException(
            "Vehicle feature with group key %s and feature key %s not found".formatted(groupKey, featureKey)));
  }

  @Override
  public Long createVehicleFeature(VehicleFeatureDto vehicleFeatureDto) {
    return vehicleFeatureService.createVehicleFeature(vehicleFeatureDto);
  }

  @Override
  public Long updateVehicleFeature(Long id, VehicleFeatureDto vehicleFeatureDto) {
    return vehicleFeatureService.updateVehicleFeature(id, vehicleFeatureDto);
  }

  @Override
  public void deleteVehicleFeature(Long id) {
    vehicleFeatureService.deleteVehicleFeature(id);
  }

  @Override
  public PageInfoDto<ImageDto> getVehicleImages(
      Long vehicleId, Integer pageNumber, Integer pageSize, List<String> sortBy) {
    return vehicleImageService.getVehicleImages(vehicleId, pageNumber, pageSize, sortBy);
  }

  @Override
  public ImageDto getVehicleImage(Long id) {
    return vehicleImageService.getVehicleImage(id);
  }

  @Override
  public VehicleVariantDto getVehicleVariant(Long id) {
    return vehicleVariantPersistenceService.getVehicleVariant(id).orElseThrow();
  }

  @Override
  public PageInfoDto<VehicleVariantDto> getVehicleVariants(Integer pageNumber, Integer pageSize, List<String> sortBy) {
    return vehicleVariantPersistenceService.getVehicleVariants(pageNumber, pageSize, sortBy);
  }

  @Override
  public Long createVehicleVariant(VehicleVariantDto vehicleVariantDto) {
    return vehicleVariantPersistenceService.createVehicleVariant(vehicleVariantDto);
  }

  @Override
  public Long updateVehicleVariant(Long id, VehicleVariantDto vehicleVariantDto) {
    return vehicleVariantPersistenceService.updateVehicleVariant(id, vehicleVariantDto);
  }

  @Override
  public void deleteVehicleVariant(Long id) {
    vehicleVariantPersistenceService.deleteVehicleVariant(id);
  }
}
