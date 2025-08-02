package org.example.strongauto.core.spi;

import org.example.strongauto.core.model.dto.*;

import java.util.List;

public interface PersistenceService {

    VehicleDto getVehicle(Long id);

    PageInfoDto<VehicleEmbeddedDto> getVehicles(
        VehicleFiltersDto vehicleFiltersDto, Integer pageNumber, Integer pageSize, List<String> sortBy);

    Long createVehicle(VehicleDto vehicleDto);

    Long updateVehicle(Long id, VehicleDto vehicleDto);

    void deleteVehicle(Long id);

  VehicleMakeDto getVehicleMake(String make);

  List<VehicleMakeEmbeddedDto> getVehicleMakes();

  String createVehicleMake(VehicleMakeDto vehicleMakeDto);

  String updateVehicleMake(String make, VehicleMakeDto vehicleMakeDto);

  void deleteVehicleMake(String make);

  List<VehicleFeatureDto> getVehicleFeatures();

  VehicleFeatureDto getVehicleFeature(String groupKey, String featureKey);

  Long createVehicleFeature(VehicleFeatureDto vehicleFeatureDto);

  Long updateVehicleFeature(Long id, VehicleFeatureDto vehicleFeatureDto);

  void deleteVehicleFeature(Long id);

  PageInfoDto<ImageDto> getVehicleImages(
      Long vehicleId, Integer pageNumber, Integer pageSize, List<String> sortBy);

  ImageDto getVehicleImage(Long id);

  VehicleVariantDto getVehicleVariant(Long id);

  PageInfoDto<VehicleVariantDto> getVehicleVariants(Integer pageNumber, Integer pageSize, List<String> sortBy);

  public Long createVehicleVariant(VehicleVariantDto vehicleVariantDto);

  Long updateVehicleVariant(Long id, VehicleVariantDto vehicleVariantDto);

  void deleteVehicleVariant(Long id);
}
