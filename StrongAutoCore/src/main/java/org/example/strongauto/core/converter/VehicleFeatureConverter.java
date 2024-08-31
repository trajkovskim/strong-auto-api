package org.example.strongauto.core.converter;

import org.example.strongauto.core.model.dto.VehicleFeatureDto;
import org.example.strongauto.persistence.model.VehicleFeature;
import org.mapstruct.Mapper;

@Mapper
public interface VehicleFeatureConverter {

  VehicleFeatureDto convertVehicleFeature(VehicleFeature vehicleMake);

  VehicleFeature convertVehicleFeature(VehicleFeatureDto vehicleMake);
}
