package org.example.strongauto.rest.factory;

import com.example.strongauto.rest.api.strongauto.model.Link;
import com.example.strongauto.rest.api.strongauto.model.PaginationLinks;
import com.example.strongauto.rest.api.strongauto.model.ImageLinks;
import com.example.strongauto.rest.api.strongauto.model.ImageResponse;
import com.example.strongauto.rest.api.strongauto.model.ImagesResponse;
import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.ImageDto;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.rest.controller.VehiclesController;
import org.example.strongauto.rest.converter.ImageRestConverter;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
@RequiredArgsConstructor
public class ImageResponseFactory {

  private final ImageRestConverter imageRestConverter;

  private final LinksFactory linksFactory;

  private String getLanguage() {
    return LocaleContextHolder.getLocale().getLanguage();
  }

  public Link createVehicleImageLink(Long vehicleId, Long imageId) {

    String language = getLanguage();
    return linksFactory.getSelfRelLink(
        methodOn(VehiclesController.class).getVehicleImageEntry(vehicleId, imageId, language));
  }

  public Link createVehicleImageBinaryLink(Long vehicleId, Long imageId) {

    String acceptLanguage = getLanguage();
    return linksFactory.getSelfRelLink(
        methodOn(VehiclesController.class).getVehicleImageBinaryEntry(vehicleId, imageId, acceptLanguage));
  }

  public ImageLinks createVehicleImageLinks(Long vehicleId, Long imageId) {

    return new ImageLinks()
        .self(createVehicleImageLink(vehicleId, imageId))
        .binary(createVehicleImageBinaryLink(vehicleId, imageId));
  }

  public ImagesResponse createImagesResponse(
      Long vehicleId,
      PageInfoDto<ImageDto> imagesPage,
      List<String> sortBy) {

    String acceptLanguage = LocaleContextHolder.getLocale().getLanguage();
    ImagesResponse vehiclesResponse = imageRestConverter.convert(imagesPage);

    vehiclesResponse.getImages().forEach(vehicleImage -> vehicleImage
        .links(createVehicleImageLinks(vehicleId, vehicleImage.getId())));

    PaginationLinks paginationLinks = linksFactory.createPaginationLinks(imagesPage,
        (pageNumber, pageSize) -> methodOn(VehiclesController.class)
            .getVehicleImageEntries(vehicleId, acceptLanguage, pageNumber, pageSize, sortBy));

    return vehiclesResponse.links(paginationLinks);
  }

  public ImageResponse createImageResponse(
      ImageDto imageDto, Long id, Long imageId) {

    return imageRestConverter.convert(imageDto)
        .links(createVehicleImageLinks(id, imageId));
  }
}
