package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.ImageDto;
import org.example.strongauto.core.model.VehicleAmount;
import org.example.strongauto.core.model.enums.ColorEnum;
import org.example.strongauto.core.model.enums.VehicleBodyTypeEnum;
import org.example.strongauto.core.model.enums.VehicleConditionEnum;
import org.example.strongauto.core.model.enums.VehicleDriveTypeEnum;
import org.example.strongauto.core.model.enums.VehicleFuelTypeEnum;
import org.example.strongauto.core.model.enums.VehicleStateEnum;
import org.example.strongauto.core.model.enums.VehicleTransmissionEnum;

import java.util.List;

@Getter
@Builder(toBuilder = true)
public class VehicleDto {

  private Long id;
  private VehicleStateEnum state;
  private LocalizedTextListDto title;
  private LocalizedTextListDto description;
  private LocalizedTextListDto summary;
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
  private VehicleAmount amount;
  private List<ImageDto> images;
  private List<VehicleFeatureDto> features;
}
