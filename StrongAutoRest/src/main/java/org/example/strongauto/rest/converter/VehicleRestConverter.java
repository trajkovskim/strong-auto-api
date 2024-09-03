package org.example.strongauto.rest.converter;

import com.example.strongauto.rest.api.strongauto.model.VehicleEmbeddedResponse;
import com.example.strongauto.rest.api.strongauto.model.VehicleFilters;
import com.example.strongauto.rest.api.strongauto.model.VehicleRequest;
import com.example.strongauto.rest.api.strongauto.model.VehicleResponse;
import com.example.strongauto.rest.api.strongauto.model.VehiclesResponse;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleDto;
import org.example.strongauto.core.model.dto.VehicleEmbeddedDto;
import org.example.strongauto.core.model.dto.VehicleFiltersDto;
import org.example.strongauto.core.model.dto.VehicleMakeDto;
import org.example.strongauto.core.model.dto.VehicleModelDto;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = LocalizedTextConverter.class)
public interface VehicleRestConverter {

  @Mapping(target = "year.to", source = "yearTo")
  @Mapping(target = "year.from", source = "yearFrom")
  @Mapping(target = "mileage.to", source = "mileageTo")
  @Mapping(target = "mileage.from", source = "mileageFrom")
  @Mapping(target = "amount.to", source = "priceTo")
  @Mapping(target = "amount.from", source = "priceFrom")
  VehicleFiltersDto convertVehicleFilters(VehicleFilters vehicleFilters);

  @Mapping(target = "vehicles", source = "pageInfoDto.items")
  @Mapping(target = "info", source = ".")
  VehiclesResponse convertVehiclePage(PageInfoDto<VehicleEmbeddedDto> pageInfoDto, @Context String language);

  @Mapping(target = "make", source = "make.make")
  @Mapping(target = "model", source = "model.model")
  VehicleEmbeddedResponse convertVehicle(VehicleEmbeddedDto vehicle, @Context String language);

  @Mapping(target = "make", source = "make.make")
  @Mapping(target = "model", source = "model.model")
  VehicleResponse convertVehicle(VehicleDto vehicle, @Context String language);

  @Mapping(target = "make", source = "make")
  @Mapping(target = "model", source = "model")
  VehicleDto convertVehicle(VehicleRequest vehicleRequest);

  default VehicleMakeDto mapVehicleMake(String make) {
    if (make == null) {
      return null;
    }

    return VehicleMakeDto.builder().make(make).build();
  }

  default VehicleModelDto mapVehicleModel(String model) {
    if (model == null) {
      return null;
    }

    return VehicleModelDto.builder().model(model).build();
  }
}
