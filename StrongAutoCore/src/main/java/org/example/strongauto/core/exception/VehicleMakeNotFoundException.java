package org.example.strongauto.core.exception;

/**
 * Vehicle make not found exception.
 */
public class VehicleMakeNotFoundException extends AbstractException {

  /**
   * Constructor.
   *
   * @param message the exception message
   */
  public VehicleMakeNotFoundException(String message) {
    super(message);
  }

  @Override
  public Error getError() {
    return Error.ENTITY_NOT_FOUND_ERROR;
  }
}
