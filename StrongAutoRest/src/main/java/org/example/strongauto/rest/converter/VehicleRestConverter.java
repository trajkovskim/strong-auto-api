package org.example.strongauto.rest.converter;

import com.example.rest.model.VehicleEmbeddedResponse;
import com.example.rest.model.VehicleFilters;
import com.example.rest.model.VehicleRequest;
import com.example.rest.model.VehicleResponse;
import com.example.rest.model.VehiclesResponse;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleDto;
import org.example.strongauto.core.model.dto.VehicleEmbeddedDto;
import org.example.strongauto.core.model.dto.VehicleFiltersDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface VehicleRestConverter {

  @Mapping(target = "year.to", source = "yearTo")
  @Mapping(target = "year.from", source = "yearFrom")
  @Mapping(target = "mileage.to", source = "mileageTo")
  @Mapping(target = "mileage.from", source = "mileageFrom")
  @Mapping(target = "price.to", source = "priceTo")
  @Mapping(target = "price.from", source = "priceFrom")
  VehicleFiltersDto convertVehicleFilters(VehicleFilters vehicleFilters);

  @Mapping(target = "vehicles", source = "pageInfoDto.items")
  @Mapping(target = "info", source = ".")
  VehiclesResponse convertVehiclePage(PageInfoDto<VehicleEmbeddedDto> pageInfoDto);

  @Mapping(target = "make", source = "make.make")
  @Mapping(target = "model", source = "model.model")
  VehicleEmbeddedResponse convertVehicle(VehicleEmbeddedDto vehicle);

  @Mapping(target = "make", source = "make.make")
  @Mapping(target = "model", source = "model.model")
  VehicleResponse convertVehicle(VehicleDto vehicle);

  @Mapping(target = "make.make", source = "make")
  @Mapping(target = "model.model", source = "model")
  VehicleDto convertVehicle(VehicleRequest vehicleRequest);
}
