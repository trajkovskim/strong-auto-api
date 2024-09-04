package org.example.strongauto.webclient.model.google;

import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Google api error response.
 */
@Getter
@NoArgsConstructor
public class GoogleApiErrorResponse {

  @Getter
  @NoArgsConstructor
  public static class Error {

    private int code;
    private String message;
    private String status;
  }

  private Error error;
}
