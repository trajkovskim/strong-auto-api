package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.converter.VehicleFeatureConverter;
import org.example.strongauto.core.exception.EntityAlreadyExistsException;
import org.example.strongauto.core.exception.EntityNotFoundException;
import org.example.strongauto.core.model.dto.LocalizedTextListDto;
import org.example.strongauto.core.model.dto.VehicleFeatureDto;
import org.example.strongauto.persistence.model.VehicleFeature;
import org.example.strongauto.persistence.repository.VehicleFeatureRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleFeatureService {

  private final VehicleFeatureRepository vehicleFeatureRepository;
  private final VehicleFeatureConverter vehicleFeatureConverter;

  public List<VehicleFeatureDto> findVehicleFeatures() {

    return vehicleFeatureRepository.findAll().stream().map(vehicleFeatureConverter::convertVehicleFeature).toList();
  }

  public VehicleFeatureDto findByGroupKeyAndFeatureKey(String groupKey, String featureKey) {

    return vehicleFeatureRepository.findByGroupKeyAndFeatureKey(groupKey, featureKey)
        .map(vehicleFeatureConverter::convertVehicleFeature)
        .orElseThrow(() -> new EntityNotFoundException(
            "Vehicle feature with group key %s and feature key %s not found".formatted(groupKey, featureKey)));
  }

  public void createVehicleFeature(VehicleFeatureDto vehicleFeatureDto) {

    Optional<VehicleFeature> byGroupKeyAndFeatureKey = vehicleFeatureRepository.findByGroupKeyAndFeatureKey(
        vehicleFeatureDto.getGroupKey(),
        vehicleFeatureDto.getFeatureKey());

    if (byGroupKeyAndFeatureKey.isPresent()) {
      throw new EntityAlreadyExistsException(
          "Vehicle feature with group key %s and feature key %s already exists".formatted(
              vehicleFeatureDto.getGroupKey(), vehicleFeatureDto.getFeatureKey()));
    }

    VehicleFeature vehicleFeature = vehicleFeatureConverter.convertVehicleFeature(vehicleFeatureDto);
    vehicleFeatureRepository.save(vehicleFeature);
  }

  public VehicleFeatureDto finalizeVehicleFeatureDto(
      VehicleFeatureDto vehicleFeatureDto, VehicleFeatureDto foundVehicleFeatureDto) {

    LocalizedTextListDto groupName = Optional.ofNullable(foundVehicleFeatureDto.getGroupName())
        .map(LocalizedTextListDto::getId)
        .flatMap(foundVehicleDescriptionId ->
            Optional.ofNullable(vehicleFeatureDto.getGroupName())
                .map(LocalizedTextListDto::toBuilder)
                .map(x -> x.id(foundVehicleDescriptionId)))
        .map(LocalizedTextListDto.LocalizedTextListDtoBuilder::build)
        .orElse(null);

    LocalizedTextListDto featureName = Optional.ofNullable(foundVehicleFeatureDto.getFeatureName())
        .map(LocalizedTextListDto::getId)
        .flatMap(localizedTextListId ->
            Optional.ofNullable(vehicleFeatureDto.getFeatureName())
                .map(LocalizedTextListDto::toBuilder)
                .map(x -> x.id(localizedTextListId)))
        .map(LocalizedTextListDto.LocalizedTextListDtoBuilder::build)
        .orElse(null);

    return vehicleFeatureDto.toBuilder()
        .id(foundVehicleFeatureDto.getId())
        .groupName(groupName)
        .featureName(featureName)
        .build();
  }

  public void updateVehicleFeature(Long id, VehicleFeatureDto vehicleFeatureDto) {

    VehicleFeature found = vehicleFeatureRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Vehicle feature not found with id " + id));
    VehicleFeatureDto foundVehicleFeatureDto = vehicleFeatureConverter.convertVehicleFeature(found);

    VehicleFeatureDto finalized = finalizeVehicleFeatureDto(vehicleFeatureDto, foundVehicleFeatureDto);

    VehicleFeature vehicleFeature = vehicleFeatureConverter.convertVehicleFeature(finalized);
    vehicleFeatureRepository.save(vehicleFeature);
  }

  public void deleteVehicleFeature(Long id) {

    vehicleFeatureRepository.deleteById(id);
  }
}
