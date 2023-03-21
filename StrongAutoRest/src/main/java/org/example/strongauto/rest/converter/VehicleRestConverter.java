package org.example.strongauto.rest.converter;

import com.example.rest.model.Amount;
import com.example.rest.model.Vehicle;
import com.example.rest.model.VehiclesResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;

@Mapper
public interface VehicleRestConverter {

  @Mapping(target = "amount", expression = "java(vehicle.getAmount().getValue().doubleValue())")
  org.example.strongauto.core.model.Vehicle convertVehicle(Vehicle vehicle);

  default Amount convertAmount(double amount) {
    return new Amount()
        .currency(Amount.CurrencyEnum.MKD)
        .value(BigDecimal.valueOf(amount));
  }

  @Mapping(target = "vehicles", source = "pageInfo.items")
  @Mapping(target = "info", source = ".")
  VehiclesResponse convertToResponse(org.example.strongauto.core.model.PageInfo<org.example.strongauto.core.model.Vehicle> pageInfo);

  Vehicle convertVehicle(org.example.strongauto.core.model.Vehicle vehicle);
}
