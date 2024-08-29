package org.example.strongauto.rest.converter;

import com.example.rest.model.VehicleMakeEmbeddedResponse;
import com.example.rest.model.VehicleMakeResponse;
import org.example.strongauto.core.model.VehicleMakeDto;
import org.example.strongauto.core.model.VehicleMakeEmbeddedDto;
import org.mapstruct.Mapper;

@Mapper
public interface VehicleMakeRestConverter {

  VehicleMakeEmbeddedResponse convertVehicleMake(VehicleMakeEmbeddedDto vehicleMakeEmbeddedDto);

  VehicleMakeResponse convertVehicleMake(VehicleMakeDto vehicleMakeDto);
}
