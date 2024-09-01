package org.example.strongauto.core.converter;

import org.example.strongauto.core.model.dto.VehicleImageDto;
import org.example.strongauto.persistence.model.VehicleImage;
import org.mapstruct.Mapper;

@Mapper
public interface VehicleImageConverter {

  VehicleImageDto convertVehicleImage(VehicleImage vehicleImage);
}
