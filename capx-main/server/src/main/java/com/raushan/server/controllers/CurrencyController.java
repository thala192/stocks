package com.chaitanya.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chaitanya.server.responses.ApiError;
import com.chaitanya.server.responses.ApiResponse;
import com.chaitanya.server.responses.CurrencyResponse;
import com.chaitanya.server.services.CurrencyService;

@RestController
@RequestMapping("/api/v1/currency")
public class CurrencyController {

  private final CurrencyService currencyService;

  public CurrencyController(CurrencyService currencyService) {
    this.currencyService = currencyService;
  }

  @GetMapping("/rate")
  public ApiResponse getCurrencyRate(@RequestParam String curr) {
    String baseCurrency = "USD";
    try {
      CurrencyResponse response = currencyService.getCurrencyService(baseCurrency, curr);
      return new ApiResponse(true, "Currency exchange rate fetched successfully", response);
    } catch (RuntimeException e) {
      return new ApiError("Failed to fetch currency exchange rate", e.getMessage());
    }
  }
  
  @GetMapping("/rate/custom")
  public ApiResponse getCustomCurrencyRate(@RequestParam String from, @RequestParam String to) {
    try {
      CurrencyResponse response = currencyService.getCurrencyService(from, to);
      return new ApiResponse(true, "Currency exchange rate fetched successfully", response);
    } catch (RuntimeException e) {
      return new ApiError("Failed to fetch currency exchange rate", e.getMessage());
    }
  }
}
