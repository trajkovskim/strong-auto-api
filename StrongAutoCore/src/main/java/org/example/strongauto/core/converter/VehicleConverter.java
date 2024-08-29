package org.example.strongauto.core.converter;

import org.example.strongauto.core.model.dto.VehicleDto;
import org.example.strongauto.core.model.dto.VehicleEmbeddedDto;
import org.example.strongauto.core.model.dto.VehicleFiltersDto;
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

  @Mapping(target = "amount.total", source = "totalAmount")
  @Mapping(target = "amount.totalPromo", source = "totalPromoAmount")
  @Mapping(target = "amount.currency", source = "currency")
  VehicleDto convertVehicle(Vehicle vehicle);

  @Mapping(target = "totalAmount", source = "amount.total")
  @Mapping(target = "totalPromoAmount", source = "amount.totalPromo")
  @Mapping(target = "currency", source = "amount.currency")
  Vehicle convertVehicle(VehicleDto vehicle);

  @Mapping(target = "amount.total", source = "totalAmount")
  @Mapping(target = "amount.totalPromo", source = "totalPromoAmount")
  @Mapping(target = "amount.currency", source = "currency")
  VehicleEmbeddedDto convertVehicle(VehicleEmbeddedProjection vehicle);

  VehicleFilters convertVehicleFilters(VehicleFiltersDto vehicle);

  @ValueMapping(target = MappingConstants.NULL, source = MappingConstants.ANY_UNMAPPED)
  ColorEnum convertColor(Color color);

  @ValueMapping(target = MappingConstants.NULL, source = MappingConstants.ANY_UNMAPPED)
  VehicleBodyTypeEnum convertVehicleBodyType(VehicleBodyType color);
}
