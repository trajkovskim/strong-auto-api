package org.example.strongauto.persistence.converter;

import org.example.strongauto.core.model.dto.VehicleFeatureDto;
import org.example.strongauto.persistence.model.VehicleFeature;
import org.mapstruct.Mapper;

@Mapper(uses = LocalizedTextConverter.class)
public interface VehicleFeatureConverter {

  VehicleFeatureDto convertVehicleFeature(VehicleFeature vehicleMake);

  VehicleFeature convertVehicleFeature(VehicleFeatureDto vehicleMake);
}
