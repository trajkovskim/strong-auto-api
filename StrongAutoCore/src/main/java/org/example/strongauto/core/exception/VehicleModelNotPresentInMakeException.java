package org.example.strongauto.core.exception;

public class VehicleModelNotPresentInMakeException extends AbstractException {

  /**
   * Constructor.
   *
   * @param message the exception message
   */
  public VehicleModelNotPresentInMakeException(String message) {
    super(message);
  }

  @Override
  public Error getError() {
    return Error.VALIDATION_ERROR;
  }
}
