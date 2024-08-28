package org.example.strongauto.rest.controller;

import com.example.rest.api.VehicleMakesApi;
import com.example.rest.model.VehicleMake;
import com.example.rest.model.VehicleMakesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.VehicleMakeDto;
import org.example.strongauto.core.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class VehicleMakesController implements VehicleMakesApi {

  private final VehicleService vehicleService;

  @Override
  public ResponseEntity<VehicleMakesResponse> getVehicleMakeEntries(String acceptLanguage) {

    List<VehicleMakeDto> vehicleMakes = vehicleService.findVehicleMakes();

    return ResponseEntity.ok(null);
  }

  @Override
  public ResponseEntity<VehicleMake> getVehicleMakeEntry(String make, String acceptLanguage) {
    VehicleMakeDto foundMake = vehicleService.findVehicleMakeByMake(make);

    return ResponseEntity.ok(null);

  }
}
