package org.example.strongauto.rest.converter;

import com.example.rest.model.VehicleFeature;
import com.example.rest.model.VehicleFeatureRequest;
import org.example.strongauto.core.model.dto.VehicleFeatureDto;
import org.mapstruct.Context;
import org.mapstruct.Mapper;

@Mapper(uses = LocalizedTextConverter.class)
public interface VehicleFeatureRestConverter {

  VehicleFeatureDto convertVehicleFeature(VehicleFeatureRequest vehicleFeature);

  VehicleFeature convertVehicleFeature(VehicleFeatureDto vehicleFeature, @Context String language);
}
