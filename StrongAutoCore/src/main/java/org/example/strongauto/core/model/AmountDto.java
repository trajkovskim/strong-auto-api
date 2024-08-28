package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.Getter;
import org.example.strongauto.core.model.enums.CurrencyEnum;

@Getter
@Builder
public class AmountDto {

  private Double amount;
  private CurrencyEnum currency;
}
