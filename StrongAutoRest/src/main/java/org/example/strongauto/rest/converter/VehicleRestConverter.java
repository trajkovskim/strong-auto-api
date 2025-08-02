package org.example.strongauto.rest.converter;

import com.example.strongauto.rest.api.strongauto.model.*;
import org.example.strongauto.core.model.dto.*;
import org.example.strongauto.core.model.enums.VehicleDriveTypeEnum;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ValueMapping;

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
  VehiclesResponse convertVehiclePage(PageInfoDto<VehicleEmbeddedDto> pageInfoDto);

  @ValueMapping(target = "AWD_4_WD", source = "AWD_4WD")
  @ValueMapping(target = "_2_WD_FWD", source = "_2WD_FWD")
  @ValueMapping(target = "_2_WD_RWD", source = "_2WD_RWD")
  VehicleDriveType convert(VehicleDriveTypeEnum vehicleDriveType);

  @ValueMapping(target = "AWD_4WD", source = "AWD_4_WD")
  @ValueMapping(target = "_2WD_FWD", source = "_2_WD_FWD")
  @ValueMapping(target = "_2WD_RWD", source = "_2_WD_RWD")
  VehicleDriveTypeEnum convert(VehicleDriveType vehicleDriveType);

  @Mapping(target = "make", source = "make.make")
  @Mapping(target = "model", source = "model.model")
  VehicleEmbeddedResponse convertVehicle(VehicleEmbeddedDto vehicle);

  @Mapping(target = "make", source = "variant.make.make")
  @Mapping(target = "model", source = "variant.model.model")
  VehicleResponse convertVehicle(VehicleDto vehicle);

  @Mapping(target = "variant.make", source = "make")
  @Mapping(target = "variant.model", source = "model")
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
