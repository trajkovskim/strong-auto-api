package org.example.strongauto.rest.controller;

import com.example.strongauto.rest.api.strongauto.VehicleFeaturesApi;
import com.example.strongauto.rest.api.strongauto.model.VehicleFeature;
import com.example.strongauto.rest.api.strongauto.model.VehicleFeatureRequest;
import com.example.strongauto.rest.api.strongauto.model.VehicleFeaturesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.VehicleFeatureDto;
import org.example.strongauto.core.service.VehicleFeatureService;
import org.example.strongauto.rest.converter.VehicleFeatureRestConverter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RequiredArgsConstructor
@StrongAutoController
public class VehicleFeaturesController implements VehicleFeaturesApi {

  private final VehicleFeatureRestConverter vehicleFeatureRestConverter;
  private final VehicleFeatureService vehicleFeatureService;

  @Override
  public ResponseEntity<Void> createVehicleFeatureEntry(VehicleFeatureRequest vehicleFeatureRequest) {

    VehicleFeatureDto vehicleFeatureDto = vehicleFeatureRestConverter.convertVehicleFeature(vehicleFeatureRequest);

    vehicleFeatureService.createVehicleFeature(vehicleFeatureDto);

    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<VehicleFeaturesResponse> getVehicleFeatureEntries(String acceptLanguage) {

    List<VehicleFeature> vehicleFeatures = vehicleFeatureService.findVehicleFeatures()
        .stream()
        .map(feature -> vehicleFeatureRestConverter.convertVehicleFeature(feature, acceptLanguage))
        .toList();

    VehicleFeaturesResponse features = new VehicleFeaturesResponse().features(vehicleFeatures);

    return ResponseEntity.ok(features);
  }

  @Override
  public ResponseEntity<Void> updateVehicleFeatureEntry(Long id, VehicleFeatureRequest vehicleFeatureRequest) {

    VehicleFeatureDto vehicleFeatureDto = vehicleFeatureRestConverter.convertVehicleFeature(vehicleFeatureRequest);

    vehicleFeatureService.updateVehicleFeature(id, vehicleFeatureDto);

    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Void> deleteVehicleFeatureEntry(Long id) {

    vehicleFeatureService.deleteVehicleFeature(id);

    return ResponseEntity.noContent().build();
  }
}
