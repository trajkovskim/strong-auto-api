package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.enums.ColorEnum;
import org.example.strongauto.core.model.enums.VehicleDriveTypeEnum;
import org.example.strongauto.core.model.enums.VehicleFuelTypeEnum;
import org.example.strongauto.core.model.enums.VehicleStateEnum;
import org.example.strongauto.core.model.enums.VehicleTransmissionEnum;

import java.util.List;

/**
 * Vehicle embedded dto.
 */
@Getter
@Builder
public class VehicleEmbeddedDto {

  private String id;
  private VehicleStateEnum state;
  private String title;
  private String summary;
  private VehicleMakeDto make;
  private VehicleModelDto model;
  private VehicleTransmissionEnum transmission;
  private VehicleDriveTypeEnum driveType;
  private VehicleFuelTypeEnum fuelType;
  private Integer mileage;
  private Integer year;
  private AmountDto amount;
  private ColorEnum color;
  private List<String> images;
}
