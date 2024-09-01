package org.example.strongauto.rest.controller;

import com.example.rest.api.VehiclesApi;
import com.example.rest.model.CreatedResponse;
import com.example.rest.model.VehicleFilters;
import com.example.rest.model.VehicleImageResponse;
import com.example.rest.model.VehicleImagesResponse;
import com.example.rest.model.VehicleRequest;
import com.example.rest.model.VehicleResponse;
import com.example.rest.model.VehiclesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleDto;
import org.example.strongauto.core.model.dto.VehicleEmbeddedDto;
import org.example.strongauto.core.model.dto.VehicleFiltersDto;
import org.example.strongauto.core.model.dto.VehicleImageDto;
import org.example.strongauto.core.service.VehicleImageService;
import org.example.strongauto.core.service.VehicleService;
import org.example.strongauto.rest.converter.VehicleRestConverter;
import org.example.strongauto.rest.factory.VehicleImageResponseFactory;
import org.example.strongauto.rest.factory.VehicleResponseFactory;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@StrongAutoController
public class VehiclesController implements VehiclesApi {

  private final VehicleService vehicleService;
  private final VehicleRestConverter vehicleRestConverter;
  private final VehicleResponseFactory vehicleResponseFactory;
  private final VehicleImageService vehicleImageService;
  private final VehicleImageResponseFactory vehicleImageResponseFactory;

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

    final VehiclesResponse response =
        vehicleResponseFactory.createVehiclesResponse(pageInfoDto, body, acceptLanguage, sortBy);

    return ResponseEntity.ok(response);
  }

  @Override
  public ResponseEntity<CreatedResponse> createVehicleEntry(VehicleRequest vehicleRequest) {

    VehicleDto vehicleDto = vehicleRestConverter.convertVehicle(vehicleRequest);

    Long savedVehicleId = vehicleService.createVehicle(vehicleDto);

    CreatedResponse createdResponse =
        vehicleResponseFactory.createVehicleMakeCreatedResponse(savedVehicleId);

    return ResponseEntity.created(URI.create(createdResponse.getLinks().getSelf().getHref())).body(createdResponse);
  }

  @Override
  public ResponseEntity<Void> updateVehicleEntry(Long id, VehicleRequest vehicleRequest) {

    VehicleDto vehicleDto = vehicleRestConverter.convertVehicle(vehicleRequest);

    vehicleService.updateVehicle(id, vehicleDto);

    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Void> deleteVehicleEntry(Long id) {

    vehicleService.deleteVehicle(id);

    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<VehicleImageResponse> getVehicleImageEntry(Long id, Long imageId, String acceptLanguage) {

    VehicleImageDto vehicleImageDto = vehicleImageService.findById(imageId);

    VehicleImageResponse vehicleImageResponse = vehicleImageResponseFactory.createVehicleImageResponse(
        vehicleImageDto, id, imageId, acceptLanguage);

    return ResponseEntity.ok(vehicleImageResponse);
  }

  @Override
  public ResponseEntity<VehicleImagesResponse> getVehicleImageEntries(
      Long id, String acceptLanguage, Integer page, Integer size, List<String> sortBy) {

    PageInfoDto<VehicleImageDto> pageInfoDto = vehicleImageService.findAllPageable(id, page, size, sortBy);

    VehicleImagesResponse vehicleImagesResponse =
        vehicleImageResponseFactory.createVehicleImagesResponse(id, pageInfoDto, acceptLanguage, sortBy);

    return ResponseEntity.ok(vehicleImagesResponse);
  }
}
