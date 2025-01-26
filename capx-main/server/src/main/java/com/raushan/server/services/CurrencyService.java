package com.chaitanya.server.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.chaitanya.server.responses.CurrencyResponse;
import com.chaitanya.server.responses.CurrencyResponseWrapper;

@Service
public class CurrencyService {

  @Value("${alphavantage.api.key}")
  private String apiKey;

  @Value("${alphavantage.api.url}")
  private String apiUrl;

  private final RestTemplate restTemplate;

  public CurrencyService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @SuppressWarnings("null")
  public CurrencyResponse getCurrencyService(String fromCurrency, String toCurrency) {
    String url = UriComponentsBuilder.fromUriString(apiUrl)
        .queryParam("function", "CURRENCY_EXCHANGE_RATE")
        .queryParam("from_currency", fromCurrency)
        .queryParam("to_currency", toCurrency)
        .queryParam("apikey", apiKey)
        .toUriString();

    ResponseEntity<CurrencyResponseWrapper> response = restTemplate.getForEntity(url, CurrencyResponseWrapper.class);

    if (response.getBody() != null && response.getBody().getExchangeRateDetails() != null) {
      return response.getBody().getExchangeRateDetails();
    } else {
      throw new RuntimeException("Failed to fetch valid currency exchange rate.");
    }
  }
}