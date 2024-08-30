package org.example.strongauto.rest.controller;

import com.example.rest.api.VehicleMakesApi;
import com.example.rest.model.CreatedResponse;
import com.example.rest.model.VehicleMakeRequest;
import com.example.rest.model.VehicleMakeResponse;
import com.example.rest.model.VehicleMakesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.VehicleMakeDto;
import org.example.strongauto.core.model.dto.VehicleMakeEmbeddedDto;
import org.example.strongauto.core.service.VehicleService;
import org.example.strongauto.rest.converter.VehicleMakeRestConverter;
import org.example.strongauto.rest.factory.VehicleMakeResponseFactory;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@StrongAutoController
public class VehicleMakesController implements VehicleMakesApi {

  private final VehicleService vehicleService;
  private final VehicleMakeResponseFactory vehicleMakeResponseFactory;
  private final VehicleMakeRestConverter vehicleMakeRestConverter;

  @Override
  public ResponseEntity<VehicleMakesResponse> getVehicleMakeEntries(String acceptLanguage) {

    List<VehicleMakeEmbeddedDto> vehicleMakes = vehicleService.findVehicleMakes();

    VehicleMakesResponse vehicleMakesResponse =
        vehicleMakeResponseFactory.createVehicleMakesResponse(vehicleMakes, acceptLanguage);

    return ResponseEntity.ok(vehicleMakesResponse);
  }

  @Override
  public ResponseEntity<VehicleMakeResponse> getVehicleMakeEntry(String make, String acceptLanguage) {

    VehicleMakeDto vehicleMakeDto = vehicleService.findVehicleMakeByMake(make);

    VehicleMakeResponse vehicleMake = vehicleMakeResponseFactory.createVehicleMake(vehicleMakeDto, acceptLanguage);

    return ResponseEntity.ok(vehicleMake);
  }

  @Override
  public ResponseEntity<CreatedResponse> createVehicleMakeEntry(VehicleMakeRequest vehicleMakeRequest) {

    VehicleMakeDto vehicleMakeDto = vehicleMakeRestConverter.convertVehicleMake(vehicleMakeRequest);

    String savedVehicleMake = vehicleService.createVehicleMake(vehicleMakeDto);

    CreatedResponse createdResponse =
        vehicleMakeResponseFactory.createVehicleMakeCreatedResponse(savedVehicleMake);

    return ResponseEntity.created(URI.create(createdResponse.getLinks().getSelf().getHref())).body(createdResponse);
  }

  @Override
  public ResponseEntity<Void> updateVehicleMakeEntry(String make, VehicleMakeRequest vehicleMakeRequest) {

    VehicleMakeDto vehicleMakeDto = vehicleMakeRestConverter.convertVehicleMake(vehicleMakeRequest);

    vehicleService.updateVehicleMake(make, vehicleMakeDto);

    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Void> deleteVehicleMakeEntry(String make) {

    vehicleService.deleteVehicleMake(make);

    return ResponseEntity.noContent().build();
  }
}
