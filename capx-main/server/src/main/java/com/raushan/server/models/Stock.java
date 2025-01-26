package com.chaitanya.server.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "stocks")
public class Stock {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "ticker", nullable = false, unique = true)
  private String ticker;

  @Column(name = "quantity", nullable = false)
  private Double quantity;

  @Column(name = "buy_price", nullable = false)
  private Double buyPrice;
}
