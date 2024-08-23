package org.example.strongauto.rest.controller;

import com.example.rest.api.VehiclesApi;
import com.example.rest.model.Vehicle;
import com.example.rest.model.VehicleFilters;
import com.example.rest.model.VehiclesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.PageInfo;
import org.example.strongauto.core.model.VehicleDto;
import org.example.strongauto.core.service.VehicleService;
import org.example.strongauto.rest.converter.VehicleRestConverter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class VehiclesController implements VehiclesApi {

  private final VehicleService vehicleService;

  private final VehicleRestConverter vehicleRestConverter;

  @Override
  public ResponseEntity<Vehicle> getVehicleEntry(String id, String acceptLanguage) {

    final VehicleDto vehicle = vehicleService.findById(id);

    final Vehicle response = vehicleRestConverter.convertVehicle(vehicle);

    return ResponseEntity.ok(response);
  }

  @Override
  public ResponseEntity<VehiclesResponse> searchVehicleEntries(
      VehicleFilters body, String acceptLanguage, Integer page, Integer size, List<String> sortBy) {

    PageInfo<VehicleDto> pageInfo = vehicleService.findAllPageable(page, size, sortBy);

    final VehiclesResponse response = vehicleRestConverter.convertToResponse(pageInfo);

    return ResponseEntity.ok(response);
  }
}
