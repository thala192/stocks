package com.chaitanya.server.controllers;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chaitanya.server.responses.ApiResponse;
import com.chaitanya.server.utils.DateUtils;

@RestController
@RequestMapping("/api/v1")
public class AppController {

  @GetMapping("/health")
  public ResponseEntity<ApiResponse> healthStatus() {
    Map<String, Object> data = new HashMap<>();
    data.put("status", "OK");
    data.put("uptime", System.nanoTime() / 1_000_000_000.0);
    data.put("Date", DateUtils.formatDate(Instant.now()));
    data.put("Time", DateUtils.formatTime(Instant.now()));
    return ResponseEntity.ok(new ApiResponse(true, "Server is healthy and running!", data));
  }

  @GetMapping("/welcome")
  public ResponseEntity<ApiResponse> welcomeMessage() {
    return ResponseEntity.ok(new ApiResponse(true, "Welcome to the CAPX Trading Platform - BACKEND API SERVER!"));
  }
}