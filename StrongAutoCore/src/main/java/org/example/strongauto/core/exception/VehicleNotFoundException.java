package org.example.strongauto.core.exception;

/**
 * Vehicle not found exception.
 */
public class VehicleNotFoundException extends AbstractException {

  /**
   * Constructor.
   *
   * @param message the exception message
   */
  public VehicleNotFoundException(String message) {
    super(message);
  }

  @Override
  public Error getError() {
    return Error.ENTITY_NOT_FOUND_ERROR;
  }
}
