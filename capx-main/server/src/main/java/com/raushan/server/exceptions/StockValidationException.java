package com.chaitanya.server.exceptions;

public class StockValidationException extends RuntimeException {
  public StockValidationException(String message) {
    super(message);
  }
}
