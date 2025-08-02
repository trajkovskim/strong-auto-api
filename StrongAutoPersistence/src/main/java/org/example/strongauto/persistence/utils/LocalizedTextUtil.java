package org.example.strongauto.persistence.utils;

import org.example.strongauto.persistence.model.LocalizedTextList;
import org.springframework.stereotype.Component;

@Component
public class LocalizedTextUtil {

  public LocalizedTextList copyId(LocalizedTextList from, LocalizedTextList to) {

    if (from == null || to == null) {
      return null;
    }

    to.setId(from.getId());
    return to;
  }
}
