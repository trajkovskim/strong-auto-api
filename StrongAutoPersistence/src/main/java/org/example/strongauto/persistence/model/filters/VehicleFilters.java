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
  private List<VehicleState> states;
  private VehicleCondition condition;
  private List<VehicleBodyType> bodyTypes;
  private VehicleTransmission transmission;
  private Integer yearFrom;
  private Integer yearTo;
  private Integer mileageFrom;
  private Integer mileageTo;
  private Double amountFrom;
  private Double amountTo;
  private VehicleFuelType fuelType;
  private Color color;
  private List<VehicleFeatureFilter> features;

  public List<VehicleCondition> getConditionAsList() {
    if (condition == null) {
      return null;
    }

    return List.of(condition);
  }

  public List<VehicleTransmission> getTransmissionAsList() {
    if (transmission == null) {
      return null;
    }

    return List.of(transmission);
  }

  public List<VehicleFuelType> getFuelTypeAsList() {
    if (fuelType == null) {
      return null;
    }

    return List.of(fuelType);
  }

  public List<Color> getColorAsList() {
    if (color == null) {
      return null;
    }

    return List.of(color);
  }
}
