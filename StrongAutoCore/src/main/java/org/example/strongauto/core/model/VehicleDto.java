package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VehicleDto {

  private String id;
  private String title;
  private String description;
  private AmountDto amount;
}
