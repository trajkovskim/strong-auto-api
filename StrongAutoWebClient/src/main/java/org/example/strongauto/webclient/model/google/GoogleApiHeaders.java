package org.example.strongauto.webclient.model.google;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GoogleApiHeaders {

  public static final String FIELD_MASK = "X-Goog-FieldMask";
  public static final String API_KEY = "X-Goog-Api-Key";
}
