package org.example.strongauto.rest.errorhandler;

import com.example.rest.model.ErrorResponse;
import org.example.strongauto.core.exception.AbstractException;
import org.example.strongauto.core.exception.Error;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestErrorHandler {

  @ExceptionHandler(AbstractException.class)
  public ResponseEntity<ErrorResponse> handleException(AbstractException exception) {

    Error error = exception.getError();

    ErrorResponse errorResponse =
        new ErrorResponse()
            .code(error.getCode())
            .message(exception.getMessage())
            .status(error.getStatus());

    return ResponseEntity.status(error.getStatus()).body(errorResponse);
  }
}
