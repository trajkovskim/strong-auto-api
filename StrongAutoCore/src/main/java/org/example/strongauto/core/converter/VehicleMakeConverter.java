package org.example.strongauto.core.converter;

import org.example.strongauto.core.model.dto.VehicleMakeDto;
import org.example.strongauto.core.model.dto.VehicleMakeEmbeddedDto;
import org.example.strongauto.persistence.model.VehicleMake;
import org.mapstruct.Mapper;


@Mapper(uses = VehicleModelConverter.class)
public interface VehicleMakeConverter {

  VehicleMakeDto convertVehicleMake(VehicleMake vehicleMake);

  VehicleMakeEmbeddedDto convertVehicleMakeEmbedded(VehicleMake vehicleMake);

  VehicleMake convertVehicleMake(VehicleMakeDto vehicleMake);
}
