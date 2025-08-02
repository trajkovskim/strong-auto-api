package org.example.strongauto.core.model.dto;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.VehicleAmount;
import org.example.strongauto.core.model.enums.ColorEnum;
import org.example.strongauto.core.model.enums.VehicleConditionEnum;
import org.example.strongauto.core.model.enums.VehicleStateEnum;

import java.util.List;

@Getter
@Builder(toBuilder = true)
public class VehicleDto {

  private Long id;
  private VehicleStateEnum state;
  private VehicleConditionEnum condition;
  private List<LocalizedTextDto> title;
  private List<LocalizedTextDto> description;
  private List<LocalizedTextDto> summary;
  private VehicleVariantDto variant;
  private Integer mileage;
  private Integer year;
  private Integer doors;
  private ColorEnum color;
  private VehicleAmount amount;
  private List<ImageDto> images;
  private List<VehicleFeatureDto> features;
}
