package org.example.strongauto.core.converter;

import org.example.strongauto.core.model.Vehicle;
import org.mapstruct.Mapper;

import java.util.Collection;

@Mapper
public interface VehicleCoreConverter {
  Vehicle convertVehicle(org.example.strongauto.persistence.model.Vehicle vehicle);

  org.example.strongauto.persistence.model.Vehicle convertVehicle(Vehicle vehicle);

  Collection<org.example.strongauto.persistence.model.Vehicle> convertListOfVehicle(Collection<Vehicle> vehicle);
  Collection<Vehicle> convertListOfVehicleToCore(Collection<org.example.strongauto.persistence.model.Vehicle> vehicle);

}
