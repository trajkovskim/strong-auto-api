package org.example.strongauto.rest.factory;

import com.example.rest.model.PaginationLinks;
import com.example.rest.model.SelfLink;
import com.example.rest.model.VehicleImageResponse;
import com.example.rest.model.VehicleImagesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleImageDto;
import org.example.strongauto.rest.controller.VehiclesController;
import org.example.strongauto.rest.converter.VehicleImageRestConverter;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
@RequiredArgsConstructor
public class VehicleImageResponseFactory {

  private final VehicleImageRestConverter vehicleImageRestConverter;

  private final LinksFactory linksFactory;

  public SelfLink createVehicleImageSelfLink(Long vehicleId, Long imageId, String acceptLanguage) {

    return linksFactory.createSelfLink(
        methodOn(VehiclesController.class)
            .getVehicleImageEntry(vehicleId, imageId, acceptLanguage));
  }

  public VehicleImagesResponse createVehicleImagesResponse(
      Long vehicleId,
      PageInfoDto<VehicleImageDto> vehicleImagesPage,
      String acceptLanguage,
      List<String> sortBy) {

    VehicleImagesResponse vehiclesResponse =
        vehicleImageRestConverter.convertVehicleImagePage(vehicleImagesPage, acceptLanguage);

    vehiclesResponse.getImages().forEach(vehicleImage -> vehicleImage
        .links(createVehicleImageSelfLink(vehicleId, vehicleImage.getId(), acceptLanguage)));

    PaginationLinks paginationLinks = linksFactory.createPaginationLinks(vehicleImagesPage,
        (pageNumber, pageSize) -> methodOn(VehiclesController.class)
            .getVehicleImageEntries(vehicleId, acceptLanguage, pageNumber, pageSize, sortBy));

    return vehiclesResponse.links(paginationLinks);
  }

  public VehicleImageResponse createVehicleImageResponse(
      VehicleImageDto vehicleImageDto, Long id, Long imageId, String acceptLanguage) {

    return vehicleImageRestConverter.convertVehicleImage(vehicleImageDto)
        .links(createVehicleImageSelfLink(id, imageId, acceptLanguage));
  }
}
