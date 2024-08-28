package org.example.strongauto.core.exception;

/**
 * Abstract exception implementation.
 */
public abstract class AbstractException extends RuntimeException {

  /**
   * Constructor.
   *
   * @param message the exception message
   */
  public AbstractException(String message) {
    super(message);
  }

  /**
   * Constructor.
   *
   * @param message the exception message
   * @param cause the throwable cause
   */
  public AbstractException(String message, Throwable cause) {
    super(message, cause);
  }

  public abstract Error getError();
}
