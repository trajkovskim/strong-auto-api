package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.enums.CurrencyEnum;

/**
 * Vehicle amount dto.
 */
@Getter
@Builder
public class VehicleAmountDto {

  private Double total;
  private Double totalPromo;
  private Double saving;
  private CurrencyEnum currency;
}
