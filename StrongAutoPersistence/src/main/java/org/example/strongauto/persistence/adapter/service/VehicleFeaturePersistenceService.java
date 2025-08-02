package org.example.strongauto.persistence.adapter.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.persistence.converter.VehicleFeatureConverter;
import org.example.strongauto.core.exception.EntityAlreadyExistsException;
import org.example.strongauto.core.exception.EntityNotFoundException;
import org.example.strongauto.core.model.dto.VehicleFeatureDto;
import org.example.strongauto.persistence.model.VehicleFeature;
import org.example.strongauto.persistence.repository.VehicleFeatureRepository;
import org.example.strongauto.persistence.utils.LocalizedTextUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleFeaturePersistenceService {

  private final VehicleFeatureRepository vehicleFeatureRepository;
  private final VehicleFeatureConverter vehicleFeatureConverter;
  private final LocalizedTextUtil localizedTextUtil;

  public List<VehicleFeatureDto> getVehicleFeatures() {
    return vehicleFeatureRepository.findAll().stream().map(vehicleFeatureConverter::convertVehicleFeature).toList();
  }

  public Optional<VehicleFeatureDto> getVehicleFeature(String groupKey, String featureKey) {
    return vehicleFeatureRepository.findByGroupKeyAndFeatureKey(groupKey, featureKey)
        .map(vehicleFeatureConverter::convertVehicleFeature);
  }

  public Long createVehicleFeature(VehicleFeatureDto vehicleFeatureDto) {

    Optional<VehicleFeature> byGroupKeyAndFeatureKey = vehicleFeatureRepository.findByGroupKeyAndFeatureKey(
        vehicleFeatureDto.getGroupKey(), vehicleFeatureDto.getFeatureKey());

    if (byGroupKeyAndFeatureKey.isPresent()) {
      throw new EntityAlreadyExistsException(
          "Vehicle feature with group key %s and feature key %s already exists".formatted(
              vehicleFeatureDto.getGroupKey(), vehicleFeatureDto.getFeatureKey()));
    }

    VehicleFeature vehicleFeature = vehicleFeatureConverter.convertVehicleFeature(vehicleFeatureDto);
    VehicleFeature saved = vehicleFeatureRepository.save(vehicleFeature);

    return saved.getId();
  }

  public VehicleFeature finalizeVehicleFeature(VehicleFeature vehicleFeature, VehicleFeature foundVehicleFeature) {

    localizedTextUtil.copyId(foundVehicleFeature.getGroupName(), vehicleFeature.getGroupName());
    localizedTextUtil.copyId(foundVehicleFeature.getFeatureName(), vehicleFeature.getFeatureName());

    return vehicleFeature;
  }

  public Long updateVehicleFeature(Long id, VehicleFeatureDto vehicleFeatureDto) {

    VehicleFeature found = vehicleFeatureRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Vehicle feature not found with id " + id));

    VehicleFeature vehicleFeature = vehicleFeatureConverter.convertVehicleFeature(vehicleFeatureDto);
    VehicleFeature finalized = finalizeVehicleFeature(vehicleFeature, found);
    vehicleFeatureRepository.save(finalized);

    return vehicleFeature.getId();
  }

  public void deleteVehicleFeature(Long id) {
    vehicleFeatureRepository.deleteById(id);
  }
}
