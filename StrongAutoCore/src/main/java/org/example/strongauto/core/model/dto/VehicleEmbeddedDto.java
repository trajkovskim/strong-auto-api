package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.VehicleAmount;
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

  private Long id;
  private VehicleStateEnum state;
  private LocalizedTextListDto title;
  private LocalizedTextListDto summary;
  private VehicleMakeDto make;
  private VehicleModelDto model;
  private VehicleTransmissionEnum transmission;
  private VehicleDriveTypeEnum driveType;
  private VehicleFuelTypeEnum fuelType;
  private Integer mileage;
  private Integer year;
  private VehicleAmount amount;
  private List<VehicleImageEmbeddedDto> images;
}
