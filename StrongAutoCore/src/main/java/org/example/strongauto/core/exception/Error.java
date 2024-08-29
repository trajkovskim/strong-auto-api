package org.example.strongauto.core.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Error codes enumeration.
 */
@Getter
@RequiredArgsConstructor
public enum Error {

  PERSISTENCE_ERROR("STRONGAUTO:0001", "strongauto.error.persistence.generic.error", 500),
  ENTITY_NOT_FOUND_ERROR("STRONGAUTO:0002", "strongauto.error.persistence.not.found.error", 404),
  VALIDATION_ERROR("STRONGAUTO:0003", "strongauto.error.validation.generic.error", 404);

  private final String code;
  private final String message;
  private final int status;
}
