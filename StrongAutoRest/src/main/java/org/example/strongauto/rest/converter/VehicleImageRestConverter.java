package org.example.strongauto.rest.converter;

import com.example.rest.model.VehicleImageResponse;
import com.example.rest.model.VehicleImagesResponse;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleImageDto;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface VehicleImageRestConverter {

  VehicleImageResponse convertVehicleImage(VehicleImageDto vehicleImageDto);

  @Mapping(target = "images", source = "pageDto.items")
  @Mapping(target = "info", source = ".")
  VehicleImagesResponse convertVehicleImagePage(PageInfoDto<VehicleImageDto> pageDto, @Context String language);
}
