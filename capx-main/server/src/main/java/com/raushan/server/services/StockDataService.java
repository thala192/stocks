package com.chaitanya.server.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.chaitanya.server.responses.ApiError;
import com.chaitanya.server.responses.ApiResponse;


@Service
public class StockDataService {

  @Value("${alphavantage.api.url}")
  private String apiUrl;

  @Value("${alphavantage.api.key}")
  private String apiKey;

  public ApiResponse getStockData(String symbol, String interval) {
    RestTemplate restTemplate = new RestTemplate();

    try {
      String url = String.format("%s?function=TIME_SERIES_INTRADAY&symbol=%s&interval=%s&apikey=%s", apiUrl, symbol,
          interval, apiKey);

      ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
          url,
          org.springframework.http.HttpMethod.GET,
          null,
          new ParameterizedTypeReference<Map<String, Object>>() {});

      if (responseEntity.getStatusCode() != HttpStatus.OK) {
        return new ApiError("Failed to fetch stock data", "HTTP Status: " + responseEntity.getStatusCode());
      }

      Map<String, Object> response = responseEntity.getBody();

      if (response == null || response.containsKey("Error Message")) {
        return new ApiError("Failed to fetch stock data",
            response != null ? response.get("Error Message").toString() : "Unknown error");
      }

      return new ApiResponse(true, "Stock data fetched successfully", response);
    } catch (HttpClientErrorException e) {
      return new ApiError("HTTP error occurred while fetching stock data", e.getResponseBodyAsString());
    } catch (Exception e) {
      return new ApiError("An error occurred while fetching stock data", e.getMessage());
    }
  }
}