package org.example.strongauto.rest.factory;

import com.example.strongauto.rest.api.strongauto.model.CreatedResponse;
import com.example.strongauto.rest.api.strongauto.model.SelfLink;
import com.example.strongauto.rest.api.strongauto.model.VehicleMakeEmbeddedResponse;
import com.example.strongauto.rest.api.strongauto.model.VehicleMakeResponse;
import com.example.strongauto.rest.api.strongauto.model.VehicleMakesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.VehicleMakeDto;
import org.example.strongauto.core.model.dto.VehicleMakeEmbeddedDto;
import org.example.strongauto.rest.controller.VehicleMakesController;
import org.example.strongauto.rest.converter.VehicleMakeRestConverter;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

/**
 * Vehicle make response factory.
 */
@Component
@RequiredArgsConstructor
public class VehicleMakeResponseFactory {

  private final VehicleMakeRestConverter vehicleMakeRestConverter;
  private final LinksFactory linksFactory;

  private SelfLink createVehicleMakeSelfLink(String make, String acceptLanguage) {

    return linksFactory.createSelfLink(
        methodOn(VehicleMakesController.class)
            .getVehicleMakeEntry(make, acceptLanguage));
  }

  public CreatedResponse createVehicleMakeCreatedResponse(String make) {

    return new CreatedResponse().links(createVehicleMakeSelfLink(make, null));
  }

  public VehicleMakesResponse createVehicleMakesResponse(
      List<VehicleMakeEmbeddedDto> vehicleMakeEmbeddedDtos, String acceptLanguage) {

    List<VehicleMakeEmbeddedResponse> vehicleMakeEmbeddeds =
        vehicleMakeEmbeddedDtos
            .stream()
            .map(vehicleMakeRestConverter::convertVehicleMake)
            .map((vehicleMakeEmbedded) ->
                vehicleMakeEmbedded
                    .links(createVehicleMakeSelfLink(vehicleMakeEmbedded.getMake(), acceptLanguage)))
            .toList();

    return new VehicleMakesResponse().makes(vehicleMakeEmbeddeds);
  }

  public VehicleMakeResponse createVehicleMake(VehicleMakeDto vehicleMakeDto, String acceptLanguage) {

    return vehicleMakeRestConverter.convertVehicleMake(vehicleMakeDto)
        .links(createVehicleMakeSelfLink(vehicleMakeDto.getMake(), acceptLanguage));
  }
}
