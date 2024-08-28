package org.example.strongauto.persistence.model.filters;

import lombok.Getter;
import lombok.Setter;
import org.example.strongauto.persistence.model.enums.Color;
import org.example.strongauto.persistence.model.enums.VehicleBodyType;
import org.example.strongauto.persistence.model.enums.VehicleCondition;
import org.example.strongauto.persistence.model.enums.VehicleFuelType;
import org.example.strongauto.persistence.model.enums.VehicleState;
import org.example.strongauto.persistence.model.enums.VehicleTransmission;

import java.util.List;

/**
 * Vehicle filters.
 */
@Getter
@Setter
public class VehicleFilters {

  String make;
  String model;
  IntervalFilter<Integer> price;
  List<VehicleState> states;
  VehicleCondition condition;
  List<VehicleBodyType> bodyType;
  VehicleTransmission transmission;
  IntervalFilter<Integer> year;
  IntervalFilter<Integer> mileage;
  VehicleFuelType fuelType;
  Color color;

  public Integer getPriceFrom() {
    if(price == null) {
      return null;
    }

    return price.getFrom();
  }

  public Integer getPriceTo() {
    if(price == null) {
      return null;
    }

    return price.getFrom();
  }

  public Integer getYearFrom() {
    if(year == null) {
      return null;
    }

    return year.getFrom();
  }

  public Integer getYearTo() {
    if(year == null) {
      return null;
    }

    return year.getTo();
  }

  public Integer getMileageFrom() {
    if(mileage == null) {
      return null;
    }

    return mileage.getFrom();
  }

  public Integer getMileageTo() {
    if(mileage == null) {
      return null;
    }

    return mileage.getTo();
  }
}
