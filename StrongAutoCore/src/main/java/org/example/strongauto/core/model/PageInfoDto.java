package org.example.strongauto.core.model;

import lombok.Builder;
import lombok.Value;

import java.util.Collection;

@Builder
@Value
public class PageInfoDto<T> {

  int totalPages;
  int pageSize;
  int pageNumber;
  Collection<T> items;
}
