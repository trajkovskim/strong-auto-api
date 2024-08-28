package org.example.strongauto.core.converter;

import org.example.strongauto.core.model.VehicleDto;
import org.example.strongauto.core.model.VehicleEmbeddedDto;
import org.example.strongauto.core.model.VehicleFiltersDto;
import org.example.strongauto.core.model.enums.ColorEnum;
import org.example.strongauto.core.model.enums.VehicleBodyTypeEnum;
import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.enums.Color;
import org.example.strongauto.persistence.model.enums.VehicleBodyType;
import org.example.strongauto.persistence.model.filters.VehicleFilters;
import org.example.strongauto.persistence.model.projections.VehicleEmbeddedProjection;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ValueMapping;

@Mapper
public interface VehicleConverter {

  @Mapping(target = "amount", source = ".")
  VehicleDto convertVehicle(Vehicle vehicle);

  @Mapping(target = ".", source = "amount")
  Vehicle convertVehicle(VehicleDto vehicle);

  @Mapping(target = "amount", source = ".")
  VehicleEmbeddedDto convertVehicle(VehicleEmbeddedProjection vehicle);

  VehicleFilters convertVehicleFilters(VehicleFiltersDto vehicle);

  @ValueMapping(target = MappingConstants.NULL, source = MappingConstants.ANY_UNMAPPED)
  ColorEnum convertColor(Color color);

  @ValueMapping(target = MappingConstants.NULL, source = MappingConstants.ANY_UNMAPPED)
  VehicleBodyTypeEnum convertVehicleBodyType(VehicleBodyType color);
}
