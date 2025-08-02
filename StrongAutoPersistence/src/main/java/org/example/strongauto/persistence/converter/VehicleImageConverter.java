package org.example.strongauto.persistence.converter;

import org.example.strongauto.core.model.dto.ImageDto;
import org.example.strongauto.persistence.model.VehicleImage;
import org.mapstruct.Mapper;

@Mapper
public interface VehicleImageConverter {

  ImageDto convertVehicleImage(VehicleImage vehicleImage);
}
