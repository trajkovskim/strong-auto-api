package org.example.strongauto.core.exception;

public class VehicleFeaturesMissingException extends AbstractException {

  public VehicleFeaturesMissingException(String message) {
    super(message);
  }

  @Override
  public Error getError() {
    return Error.VALIDATION_ERROR;
  }
}
