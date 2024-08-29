package org.example.strongauto.rest.controller;

import com.example.rest.api.VehicleMakesApi;
import com.example.rest.model.VehicleMakeResponse;
import com.example.rest.model.VehicleMakesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.VehicleMakeDto;
import org.example.strongauto.core.model.VehicleMakeEmbeddedDto;
import org.example.strongauto.core.service.VehicleService;
import org.example.strongauto.rest.factory.VehicleMakeResponseFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class VehicleMakesController implements VehicleMakesApi {

  private final VehicleService vehicleService;
  private final VehicleMakeResponseFactory vehicleMakeResponseFactory;

  @Override
  public ResponseEntity<VehicleMakesResponse> getVehicleMakeEntries(String acceptLanguage) {

    List<VehicleMakeEmbeddedDto> vehicleMakes = vehicleService.findVehicleMakes();

    VehicleMakesResponse vehicleMakesResponse = vehicleMakeResponseFactory.createVehicleMakesResponse(vehicleMakes, acceptLanguage);

    return ResponseEntity.ok(vehicleMakesResponse);
  }

  @Override
  public ResponseEntity<VehicleMakeResponse> getVehicleMakeEntry(String make, String acceptLanguage) {

    VehicleMakeDto vehicleMakeDto = vehicleService.findVehicleMakeByMake(make);

    VehicleMakeResponse vehicleMake = vehicleMakeResponseFactory.createVehicleMake(vehicleMakeDto, acceptLanguage);

    return ResponseEntity.ok(vehicleMake);

  }
}
