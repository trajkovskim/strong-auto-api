package org.example.strongauto.rest.controller;

import com.example.rest.api.VehicleFeaturesApi;
import com.example.rest.model.VehicleFeature;
import com.example.rest.model.VehicleFeatureRequest;
import com.example.rest.model.VehicleFeaturesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.VehicleFeatureDto;
import org.example.strongauto.core.service.VehicleService;
import org.example.strongauto.rest.converter.VehicleFeatureRestConverter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RequiredArgsConstructor
@StrongAutoController
public class VehicleFeaturesController implements VehicleFeaturesApi {

  private final VehicleFeatureRestConverter vehicleFeatureRestConverter;
  private final VehicleService vehicleService;

  @Override
  public ResponseEntity<Void> createVehicleFeatureEntry(VehicleFeatureRequest vehicleFeatureRequest) {

    VehicleFeatureDto vehicleFeatureDto =
        vehicleFeatureRestConverter.convertVehicleFeature(vehicleFeatureRequest);

    vehicleService.createVehicleFeature(vehicleFeatureDto);

    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<VehicleFeaturesResponse> getVehicleFeatureEntries(String acceptLanguage) {

    List<VehicleFeature> vehicleFeatures = vehicleService.findVehicleFeatures()
        .stream()
        .map(feature -> vehicleFeatureRestConverter.convertVehicleFeature(feature, acceptLanguage))
        .toList();

    VehicleFeaturesResponse features = new VehicleFeaturesResponse().features(vehicleFeatures);

    return ResponseEntity.ok(features);
  }

  @Override
  public ResponseEntity<Void> updateVehicleFeatureEntry(Long id, VehicleFeatureRequest vehicleFeatureRequest) {

    VehicleFeatureDto vehicleFeatureDto =
        vehicleFeatureRestConverter.convertVehicleFeature(vehicleFeatureRequest);

    vehicleService.updateVehicleFeature(id, vehicleFeatureDto);

    return ResponseEntity.noContent().build();
  }
}
