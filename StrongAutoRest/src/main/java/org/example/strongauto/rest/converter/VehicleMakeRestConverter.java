package org.example.strongauto.rest.converter;

import com.example.rest.model.VehicleMakeEmbeddedResponse;
import com.example.rest.model.VehicleMakeRequest;
import com.example.rest.model.VehicleMakeResponse;
import org.example.strongauto.core.model.dto.VehicleMakeDto;
import org.example.strongauto.core.model.dto.VehicleMakeEmbeddedDto;
import org.mapstruct.Mapper;

@Mapper
public interface VehicleMakeRestConverter {

  VehicleMakeEmbeddedResponse convertVehicleMake(VehicleMakeEmbeddedDto vehicleMakeEmbeddedDto);

  VehicleMakeResponse convertVehicleMake(VehicleMakeDto vehicleMakeDto);

  VehicleMakeDto convertVehicleMake(VehicleMakeRequest vehicleMakeRequest);
}
