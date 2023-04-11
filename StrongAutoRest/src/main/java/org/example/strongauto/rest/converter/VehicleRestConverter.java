package org.example.strongauto.rest.converter;

import com.example.rest.model.Vehicle;
import com.example.rest.model.VehiclesResponse;
import org.example.strongauto.core.model.VehicleDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface VehicleRestConverter {

  @Mapping(target = "vehicles", source = "pageInfo.items")
  @Mapping(target = "info", source = ".")
  VehiclesResponse convertToResponse(org.example.strongauto.core.model.PageInfo<VehicleDto> pageInfo);

  Vehicle convertVehicle(VehicleDto vehicle);
}
