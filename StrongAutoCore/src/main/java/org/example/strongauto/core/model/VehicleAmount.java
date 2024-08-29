package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.enums.CurrencyEnum;

/**
 * Vehicle amount dto.
 */
@Getter
@Builder
public class VehicleAmount {

  private Double total;
  private Double totalPromo;
  private CurrencyEnum currency;

  public Double getSaving() {
    if(totalPromo == null) {
      return null;
    }

    return total - totalPromo;
  }
}
