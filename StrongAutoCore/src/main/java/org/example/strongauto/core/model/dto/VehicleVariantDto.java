package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.enums.VehicleBodyTypeEnum;
import org.example.strongauto.core.model.enums.VehicleDriveTypeEnum;
import org.example.strongauto.core.model.enums.VehicleFuelTypeEnum;
import org.example.strongauto.core.model.enums.VehicleTransmissionEnum;

@Getter
@Builder(toBuilder = true)
public class VehicleVariantDto {

  private VehicleMakeDto make;
  private VehicleModelDto model;
  private VehicleBodyTypeEnum bodyType;
  private VehicleDriveTypeEnum driveType;
  private VehicleFuelTypeEnum fuelType;
  private String engineSize;
  private String engineCode;
  private VehicleTransmissionEnum transmission;
  private Integer kW;
  private Integer yearFrom;
  private Integer yearTo;
  private ImageDto image;
}
