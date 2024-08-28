package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.Value;

@Builder
@Value
@RequiredArgsConstructor
public class IntervalFilterDto<T> {

  T from;
  T to;
}
