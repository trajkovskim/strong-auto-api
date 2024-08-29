package org.example.strongauto.core.converter;

import org.example.strongauto.core.model.dto.VehicleModelDto;
import org.example.strongauto.persistence.model.VehicleModel;
import org.mapstruct.Mapper;

@Mapper
public interface VehicleModelConverter {

  VehicleModelDto convertVehicle(VehicleModel vehicleModel);

  VehicleModel convertVehicle(VehicleModelDto vehicleModel);
}
