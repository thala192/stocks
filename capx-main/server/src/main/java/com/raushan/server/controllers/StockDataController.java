package com.chaitanya.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.raushan.server.responses.ApiResponse;
import com.raushan.server.services.StockDataService;

@RestController
@RequestMapping("/api/v1/stocks")
public class StockDataController {
  
  @Autowired
  private StockDataService stockDataService;

  @GetMapping("/data")
  public ApiResponse getStockData(@RequestParam String symbol, @RequestParam String interval) {
    return stockDataService.getStockData(symbol, interval);
  }
}