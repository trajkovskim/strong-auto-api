package org.example.strongauto.rest.converter;

import com.example.strongauto.rest.api.strongauto.model.VehicleMakeEmbeddedResponse;
import com.example.strongauto.rest.api.strongauto.model.VehicleMakeRequest;
import com.example.strongauto.rest.api.strongauto.model.VehicleMakeResponse;
import org.example.strongauto.core.model.dto.VehicleMakeDto;
import org.example.strongauto.core.model.dto.VehicleMakeEmbeddedDto;
import org.mapstruct.Mapper;

@Mapper
public interface VehicleMakeRestConverter {

  VehicleMakeEmbeddedResponse convertVehicleMake(VehicleMakeEmbeddedDto vehicleMakeEmbeddedDto);

  VehicleMakeResponse convertVehicleMake(VehicleMakeDto vehicleMakeDto);

  VehicleMakeDto convertVehicleMake(VehicleMakeRequest vehicleMakeRequest);
}
