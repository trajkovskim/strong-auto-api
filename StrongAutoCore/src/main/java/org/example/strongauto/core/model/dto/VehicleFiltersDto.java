package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.enums.ColorEnum;
import org.example.strongauto.core.model.enums.VehicleBodyTypeEnum;
import org.example.strongauto.core.model.enums.VehicleConditionEnum;
import org.example.strongauto.core.model.enums.VehicleFuelTypeEnum;
import org.example.strongauto.core.model.enums.VehicleStateEnum;
import org.example.strongauto.core.model.enums.VehicleTransmissionEnum;

import java.util.List;

/**
 * Vehicle filters dto.
 */
@Getter
@Builder
public class VehicleFiltersDto {

  String make;
  String model;
  IntervalFilterDto<Integer> price;
  List<VehicleStateEnum> states;
  VehicleConditionEnum condition;
  List<VehicleBodyTypeEnum> bodyTypes;
  VehicleTransmissionEnum transmission;
  IntervalFilterDto<Integer> year;
  IntervalFilterDto<Integer> mileage;
  VehicleFuelTypeEnum fuelType;
  ColorEnum color;
}
