package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.enums.ColorEnum;
import org.example.strongauto.core.model.enums.VehicleBodyTypeEnum;
import org.example.strongauto.core.model.enums.VehicleConditionEnum;
import org.example.strongauto.core.model.enums.VehicleDriveTypeEnum;
import org.example.strongauto.core.model.enums.VehicleFuelTypeEnum;
import org.example.strongauto.core.model.enums.VehicleStateEnum;
import org.example.strongauto.core.model.enums.VehicleTransmissionEnum;

import java.util.List;

@Getter
@Builder
public class VehicleDto {

  private Long id;
  private VehicleStateEnum state;
  private String title;
  private String description;
  private String summary;
  private VehicleMakeDto make;
  private VehicleModelDto model;
  private VehicleBodyTypeEnum bodyType;
  private VehicleConditionEnum condition;
  private VehicleDriveTypeEnum driveType;
  private VehicleFuelTypeEnum fuelType;
  private Integer mileage;
  private Integer year;
  private Integer doors;
  private String engineSize;
  private VehicleTransmissionEnum transmission;
  private ColorEnum color;
  private AmountDto amount;
  private List<String> images;
  private List<String> features;
}
