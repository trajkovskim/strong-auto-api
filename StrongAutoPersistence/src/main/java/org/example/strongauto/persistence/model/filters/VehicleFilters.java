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

  private String make;
  private String model;
  private IntervalFilter<Integer> price;
  private List<VehicleState> states;
  private VehicleCondition condition;
  private List<VehicleBodyType> bodyTypes;
  private VehicleTransmission transmission;
  private IntervalFilter<Integer> year;
  private IntervalFilter<Integer> mileage;
  private VehicleFuelType fuelType;
  private Color color;

  public Integer getPriceFrom() {
    if (price == null) {
      return null;
    }

    return price.getFrom();
  }

  public Integer getPriceTo() {
    if (price == null) {
      return null;
    }

    return price.getFrom();
  }

  public Integer getYearFrom() {
    if (year == null) {
      return null;
    }

    return year.getFrom();
  }

  public Integer getYearTo() {
    if (year == null) {
      return null;
    }

    return year.getTo();
  }

  public Integer getMileageFrom() {
    if (mileage == null) {
      return null;
    }

    return mileage.getFrom();
  }

  public Integer getMileageTo() {
    if (mileage == null) {
      return null;
    }

    return mileage.getTo();
  }
}
