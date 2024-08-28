package org.example.strongauto.rest.converter;

import com.example.rest.model.Vehicle;
import com.example.rest.model.VehicleEmbedded;
import com.example.rest.model.VehicleFilters;
import com.example.rest.model.VehiclesResponse;
import org.example.strongauto.core.model.IntervalFilterDto;
import org.example.strongauto.core.model.PageInfoDto;
import org.example.strongauto.core.model.VehicleDto;
import org.example.strongauto.core.model.VehicleEmbeddedDto;
import org.example.strongauto.core.model.VehicleFiltersDto;
import org.example.strongauto.core.model.enums.VehicleStateEnum;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Mapper
public interface VehicleRestConverter {

  @Mapping(target = "year.to", source = "yearTo")
  @Mapping(target = "year.from", source = "yearFrom")
  @Mapping(target = "mileage.to", source = "mileageTo")
  @Mapping(target = "mileage.from", source = "mileageFrom")
  @Mapping(target = "price", source = "price", qualifiedByName = "parsePrice")
  @Mapping(target = "states", source = ".")
  VehicleFiltersDto convertVehicleFilters(VehicleFilters vehicleFilters);

  @Named("parsePrice")
  default IntervalFilterDto<Integer> parsePrice(String price) {

    IntervalFilterDto.IntervalFilterDtoBuilder<Integer> intervalFilter = IntervalFilterDto.builder();

    if(StringUtils.hasLength(price)) {
      return intervalFilter.build();
    }

    String[] priceSplit = price.split("-");

    if(priceSplit.length != 2) {
      return intervalFilter.build();
    }

    intervalFilter.from(Integer.parseInt(priceSplit[0]));

    if(!"any".equals(priceSplit[1])) {
      intervalFilter.to(Integer.parseInt(priceSplit[1]));
    }

    return intervalFilter.build();
  }

  default List<VehicleStateEnum> mapStates(VehicleFilters vehicleFilters) {
    List<VehicleStateEnum> states = new ArrayList<>();

    if (vehicleFilters.getSold()) {
      states.add(VehicleStateEnum.SOLD);
    }

    if (vehicleFilters.getFeatured()) {
      states.add(VehicleStateEnum.FEATURED);
    }

    return states;
  };

  @Mapping(target = "vehicles", source = "pageInfoDto.items")
  @Mapping(target = "info", source = ".")
  VehiclesResponse convertToResponse(PageInfoDto<VehicleEmbeddedDto> pageInfoDto);

  @Mapping(target = "make", source = "make.make")
  @Mapping(target = "model", source = "model.model")
  VehicleEmbedded convertVehicle(VehicleEmbeddedDto vehicle);

  @Mapping(target = "make", source = "make.make")
  @Mapping(target = "model", source = "model.model")
  Vehicle convertVehicle(VehicleDto vehicle);
}
