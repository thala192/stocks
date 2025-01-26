package com.chaitanya.server.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class CryptoService {

  @Value("${polygon.api.base-url}")
  private String polygonApiUrl;

  @Value("${polygon.api.key}")
  private String polygonApiKey;

  public JsonNode getDailyStockPrice(String from, String to, String date) {
    try {
      RestTemplate restTemplate = new RestTemplate();
      
      // Correcting the URL construction using String.format
      String url = String.format("%s/v1/open-close/crypto/%s/%s/%s?adjusted=true&apiKey=%s",
          polygonApiUrl, from, to, date, polygonApiKey);

      String response = restTemplate.getForObject(url, String.class);
      ObjectMapper objectMapper = new ObjectMapper();
      return objectMapper.readTree(response);
    } catch (Exception e) {
      throw new RuntimeException("Failed to fetch data from Polygon API: " + e.getMessage(), e);
    }
  }
}