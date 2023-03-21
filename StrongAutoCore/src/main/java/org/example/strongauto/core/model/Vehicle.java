package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class Vehicle {
  String id;
  double amount;
}
