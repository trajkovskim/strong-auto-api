package org.example.strongauto.core.converter;

import org.example.strongauto.core.model.VehicleDto;
import org.example.strongauto.persistence.model.Vehicle;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;

@Mapper
public interface VehicleCoreConverter {

  @Mapping(source = ".", target = "amount")
  VehicleDto convertVehicle(Vehicle vehicle);

  @Mapping(source = "amount", target = ".")
  Vehicle convertVehicle(VehicleDto vehicle);

  Collection<VehicleDto> convertListOfVehicleToCore(Collection<Vehicle> vehicle);

}
