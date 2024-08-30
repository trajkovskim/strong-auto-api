package org.example.strongauto.core.exception;

public class EntityNotFoundException extends AbstractException {

  public EntityNotFoundException(String message) {
    super(message);
  }

  @Override
  public Error getError() {
    return Error.ENTITY_NOT_FOUND_ERROR;
  }
}
