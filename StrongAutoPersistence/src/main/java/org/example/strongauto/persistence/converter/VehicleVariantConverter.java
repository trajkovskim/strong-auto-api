package org.example.strongauto.persistence.converter;

import org.example.strongauto.core.model.dto.VehicleVariantDto;
import org.example.strongauto.core.model.enums.VehicleBodyTypeEnum;
import org.example.strongauto.persistence.model.VehicleVariant;
import org.example.strongauto.persistence.model.enums.VehicleBodyType;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ValueMapping;

@Mapper
public interface VehicleVariantConverter {

  VehicleVariantDto convert(VehicleVariant vehicleVariant);

  VehicleVariant convert(VehicleVariantDto vehicleVariantDto);

  @ValueMapping(target = MappingConstants.NULL, source = MappingConstants.ANY_UNMAPPED)
  VehicleBodyTypeEnum convertVehicleBodyType(VehicleBodyType color);
}
