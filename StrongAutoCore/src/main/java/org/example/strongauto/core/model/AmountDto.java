package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AmountDto {

  private Double amount;
  private String currency;
}
