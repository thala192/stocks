package com.chaitanya.server.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiError extends ApiResponse {
  private String error;

  public ApiError(String message, String error) {
    super(false, message, null);
    this.error = error;
  }
}