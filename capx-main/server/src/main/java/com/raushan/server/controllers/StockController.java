package com.chaitanya.server.controllers;

import com.chaitanya.server.models.Stock;
import com.chaitanya.server.responses.ApiResponse;
import com.chaitanya.server.responses.ApiError;
import com.chaitanya.server.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stocks")
public class StockController {

  @Autowired
  private StockService stockService;

  // Add Stock
  @PostMapping
  public ResponseEntity<ApiResponse> addStock(@RequestBody Stock stock) {
    try {
      Stock createdStock = stockService.addStock(stock);
      return ResponseEntity.ok(new ApiResponse(true, "Stock created successfully", createdStock));
    } catch (IllegalArgumentException e) {
      ApiError apiError = new ApiError("Bad Request", "Error adding stock: " + e.getMessage());
      return ResponseEntity.badRequest().body(apiError);
    }
  }

  // Update Stock
  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse> updateStock(@PathVariable Long id, @RequestBody Stock updatedStock) {
    try {
      Stock stock = stockService.updateStock(id, updatedStock);
      return ResponseEntity.ok(new ApiResponse(true, "Stock updated successfully", stock));
    } catch (RuntimeException e) {
      ApiError apiError = new ApiError("Error", "Error updating stock: " + e.getMessage());
      return ResponseEntity.status(500).body(apiError);
    }
  }

  // Delete Stock
  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse> deleteStock(@PathVariable Long id) {
    try {
      stockService.deleteStock(id);
      return ResponseEntity.ok(new ApiResponse(true, "Stock deleted successfully"));
    } catch (RuntimeException e) {
      ApiError apiError = new ApiError("Error", "Error deleting stock: " + e.getMessage());
      return ResponseEntity.status(500).body(apiError);
    }
  }

  // Get all Stocks
  @GetMapping
  public ResponseEntity<ApiResponse> getAllStock() {
    try {
      List<Stock> stocks = stockService.getAllStocks();
      return ResponseEntity.ok(new ApiResponse(true, "Fetched all stocks successfully", stocks));
    } catch (RuntimeException e) {
      ApiError apiError = new ApiError("Error", "Error fetching all stocks: " + e.getMessage());
      return ResponseEntity.status(500).body(apiError);
    }
  }

  // Get a single Stock Data
  @GetMapping("/{id}")
  public ResponseEntity<ApiResponse> getStockById(@PathVariable Long id) {
    try {
      Stock stock = stockService.getStockById(id);
      return ResponseEntity.ok(new ApiResponse(true, "Fetched stock successfully", stock));
    } catch (RuntimeException e) {
      ApiError apiError = new ApiError("Error", "Error fetching stock: " + e.getMessage());
      return ResponseEntity.status(404).body(apiError);
    }
  }

  // Get Stock Summary
  @GetMapping("/summary")
  public ResponseEntity<ApiResponse> getStockSummary() {
    try {
      StockService.StockSummary stockSummary = stockService.getStockSummary();
      return ResponseEntity.ok(new ApiResponse(true, "Fetched stock summary successfully", stockSummary));
    } catch (RuntimeException e) {
      ApiError apiError = new ApiError("Error", "Error fetching stock summary: " + e.getMessage());
      return ResponseEntity.status(500).body(apiError);
    }
  }
}