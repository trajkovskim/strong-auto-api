package org.example.strongauto.rest.controller;

import com.example.rest.api.VehiclesApi;
import com.example.rest.model.VehicleFilters;
import com.example.rest.model.VehicleResponse;
import com.example.rest.model.VehiclesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.PageInfoDto;
import org.example.strongauto.core.model.VehicleDto;
import org.example.strongauto.core.model.VehicleEmbeddedDto;
import org.example.strongauto.core.model.VehicleFiltersDto;
import org.example.strongauto.core.service.VehicleService;
import org.example.strongauto.rest.converter.VehicleRestConverter;
import org.example.strongauto.rest.factory.VehicleResponseFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class VehiclesController implements VehiclesApi {

  private final VehicleService vehicleService;
  private final VehicleRestConverter vehicleRestConverter;
  private final VehicleResponseFactory vehicleResponseFactory;

  @Override
  public ResponseEntity<VehicleResponse> getVehicleEntry(Long id, String acceptLanguage) {

    final VehicleDto vehicle = vehicleService.findById(id);

    final VehicleResponse response = vehicleResponseFactory.createVehicleResponse(vehicle, acceptLanguage);

    return ResponseEntity.ok(response);
  }

  @Override
  public ResponseEntity<VehiclesResponse> searchVehicleEntries(
      VehicleFilters body, String acceptLanguage, Integer page, Integer size, List<String> sortBy) {

    VehicleFiltersDto filtersDto = vehicleRestConverter.convertVehicleFilters(body);

    PageInfoDto<VehicleEmbeddedDto> pageInfoDto = vehicleService.findAllPageable(filtersDto, page, size, sortBy);

    final VehiclesResponse response = vehicleResponseFactory.createVehiclesResponse(pageInfoDto, body, acceptLanguage,sortBy);

    return ResponseEntity.ok(response);
  }
}
