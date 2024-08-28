package org.example.strongauto.persistence.model.filters;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IntervalFilter<T> {

  private T from;
  private T to;
}
