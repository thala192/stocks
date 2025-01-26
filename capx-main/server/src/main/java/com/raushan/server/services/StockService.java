package com.chaitanya.server.services;

import com.chaitanya.server.exceptions.StockValidationException;
import com.chaitanya.server.models.Stock;
import com.chaitanya.server.repositories.StockRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Service
public class StockService {

  @Autowired
  private StockRepository stockRepository;

  @Value("${alphavantage.api.key}")
  private String apiKey;

  public Stock addStock(Stock stock) {
    validateStock(stock);
    return stockRepository.save(stock);
  }

  public Stock updateStock(Long id, Stock updatedStock) {
    validateStock(updatedStock);
    return stockRepository.findById(id)
        .map(existingStock -> {
          existingStock.setName(updatedStock.getName());
          existingStock.setTicker(updatedStock.getTicker());
          existingStock.setQuantity(updatedStock.getQuantity());
          existingStock.setBuyPrice(updatedStock.getBuyPrice());
          return stockRepository.save(existingStock);
        })
        .orElseThrow(() -> new RuntimeException("Stock not found with id: " + id));
  }

  public void deleteStock(Long id) {
    if (!stockRepository.existsById(id)) {
      throw new RuntimeException("Stock not found with id: " + id);
    }
    stockRepository.deleteById(id);
  }

  public List<Stock> getAllStocks() {
    return stockRepository.findAll();
  }

  public Stock getStockById(Long id) {
    return stockRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Stock not found with id: " + id));
  }

  public StockSummary getStockSummary() {
    List<Stock> stocks = stockRepository.findAll();

    double totalVolume = 0, totalBalance = 0, totalGainLoss = 0;

    for (Stock stock : stocks) {
      totalVolume += stock.getQuantity();
      totalBalance += stock.getQuantity() * stock.getBuyPrice();

      double currentPrice = getCurrentPrice(stock);
      double gainLoss = (currentPrice - stock.getBuyPrice()) / stock.getBuyPrice() * 100;
      totalGainLoss += gainLoss;
    }

    return new StockSummary(totalVolume, totalBalance, totalGainLoss / stocks.size());
  }

  public static class StockSummary {
    private double totalVolume, totalBalance, averageGainLoss;

    public StockSummary(double totalVolume, double totalBalance, double averageGainLoss) {
      this.totalVolume = totalVolume;
      this.totalBalance = totalBalance;
      this.averageGainLoss = averageGainLoss;
    }

    public double getTotalVolume() {
      return totalVolume;
    }

    public double getTotalBalance() {
      return totalBalance;
    }

    public double getAverageGainLoss() {
      return averageGainLoss;
    }
  }

  private void validateStock(Stock stock) {
    if (stock.getName() == null || stock.getName().trim().isEmpty() ||
        stock.getTicker() == null || stock.getTicker().trim().isEmpty() ||
        stock.getQuantity() == null ||
        stock.getBuyPrice() == null) {
      throw new StockValidationException("Stock fields cannot be null or empty");
    }
  }

  // Method to fetch current price from Alpha Vantage API
  public double getCurrentPrice(Stock stock) {
    String apiUrl = String.format(
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=%s&interval=5min&apikey=%s",
        stock.getTicker(), apiKey);

    RestTemplate restTemplate = new RestTemplate();
    try {
      ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
      String responseBody = response.getBody();

      if (responseBody != null) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseBody);
        JsonNode timeSeriesNode = rootNode.path("Time Series (5min)");

        if (timeSeriesNode.isArray() && timeSeriesNode.size() > 0) {
          JsonNode latestData = timeSeriesNode.get(0);
          JsonNode closePriceNode = latestData.path("4. close");

          if (closePriceNode.isTextual()) {
            String currentPriceStr = closePriceNode.asText();
            return Double.parseDouble(currentPriceStr);
          }
        }
      }
    } catch (Exception e) {
      System.out.println("Error fetching stock price from Alpha Vantage: " + e.getMessage());
    }
    return 0.0;
  }
}