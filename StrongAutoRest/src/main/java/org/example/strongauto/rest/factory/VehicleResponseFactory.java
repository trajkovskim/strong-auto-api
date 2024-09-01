package org.example.strongauto.rest.factory;

import com.example.rest.model.CreatedResponse;
import com.example.rest.model.PaginationLinks;
import com.example.rest.model.SelfLink;
import com.example.rest.model.VehicleFilters;
import com.example.rest.model.VehicleResponse;
import com.example.rest.model.VehiclesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleDto;
import org.example.strongauto.core.model.dto.VehicleEmbeddedDto;
import org.example.strongauto.rest.controller.VehiclesController;
import org.example.strongauto.rest.converter.VehicleRestConverter;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

/**
 * Vehicle response factory.
 */
@Component
@RequiredArgsConstructor
public class VehicleResponseFactory {

  private final VehicleRestConverter vehicleRestConverter;
  private final LinksFactory linksFactory;
  private final VehicleImageResponseFactory vehicleImageResponseFactory;

  private SelfLink createVehicleSelfLink(Long id, String acceptLanguage) {

    return linksFactory.createSelfLink(
        methodOn(VehiclesController.class)
            .getVehicleEntry(id, acceptLanguage));
  }

  public CreatedResponse createVehicleMakeCreatedResponse(Long id) {

    return new CreatedResponse().links(createVehicleSelfLink(id, null));
  }

  public VehiclesResponse createVehiclesResponse(
      PageInfoDto<VehicleEmbeddedDto> vehicleEmbeddedPage,
      VehicleFilters body,
      String acceptLanguage,
      List<String> sortBy) {

    VehiclesResponse vehiclesResponse = vehicleRestConverter.convertVehiclePage(vehicleEmbeddedPage, acceptLanguage);

    vehiclesResponse.getVehicles().forEach(vehicle -> {

      vehicle.getImages()
          .forEach(vehicleImage -> vehicleImage.links(
              vehicleImageResponseFactory.createVehicleImageSelfLink(vehicle.getId(),
                  vehicleImage.getId(),
                  acceptLanguage)));

      vehicle.links(createVehicleSelfLink(vehicle.getId(), acceptLanguage));
    });

    PaginationLinks paginationLinks = linksFactory.createPaginationLinks(vehicleEmbeddedPage,
        (pageNumber, pageSize) -> methodOn(VehiclesController.class)
            .searchVehicleEntries(body, acceptLanguage, pageNumber, pageSize, sortBy));

    return vehiclesResponse.links(paginationLinks);
  }

  public VehicleResponse createVehicleResponse(VehicleDto vehicleDto, String acceptLanguage) {

    return vehicleRestConverter.convertVehicle(vehicleDto, acceptLanguage)
        .links(createVehicleSelfLink(vehicleDto.getId(), acceptLanguage));
  }
}
