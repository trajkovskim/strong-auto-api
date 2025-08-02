package org.example.strongauto.rest.controller;

import com.example.strongauto.rest.api.strongauto.VehiclesApi;
import com.example.strongauto.rest.api.strongauto.model.*;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.*;
import org.example.strongauto.core.model.dto.ImageDto;
import org.example.strongauto.core.service.VehicleImageService;
import org.example.strongauto.core.service.VehicleService;
import org.example.strongauto.rest.converter.VehicleRestConverter;
import org.example.strongauto.rest.factory.ImageResponseFactory;
import org.example.strongauto.rest.factory.VehicleResponseFactory;
import org.springframework.http.MediaType;
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
  private final ImageResponseFactory imageResponseFactory;

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

    CreatedResponse createdResponse = vehicleResponseFactory.createVehicleMakeCreatedResponse(savedVehicleId);

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
  public ResponseEntity<ImageResponse> getVehicleImageEntry(Long id, Long imageId, String acceptLanguage) {

    ImageDto imageDto = vehicleImageService.findById(imageId);

    ImageResponse vehicleImageResponse =
        imageResponseFactory.createImageResponse(imageDto, id, imageId);

    return ResponseEntity.ok(vehicleImageResponse);
  }

  @Override
  public ResponseEntity<ImagesResponse> getVehicleImageEntries(
      Long id, String acceptLanguage, Integer page, Integer size, List<String> sortBy) {

    PageInfoDto<ImageDto> pageInfoDto = vehicleImageService.findAllPageable(id, page, size, sortBy);

    ImagesResponse vehicleImagesResponse =
        imageResponseFactory.createImagesResponse(id, pageInfoDto, sortBy);

    return ResponseEntity.ok(vehicleImagesResponse);
  }

  @Override
  public ResponseEntity<byte[]> getVehicleImageBinaryEntry(Long id, Long imageId, String acceptLanguage) {

    ImageDto imageDto = vehicleImageService.findById(imageId);

    byte[] imageData = imageDto.getData();

    return ResponseEntity.ok().contentType(MediaType.parseMediaType(imageDto.getContentType())).body(imageData);
  }
}
