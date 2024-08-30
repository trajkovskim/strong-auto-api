package org.example.strongauto.core.exception;

public class EntityAlreadyExistsException extends AbstractException {

  /**
   * Constructor.
   *
   * @param message the exception message
   */
  public EntityAlreadyExistsException(String message) {
    super(message);
  }

  @Override
  public Error getError() {
    return Error.ENTITY_NOT_EXISTS_ERROR;
  }
}
