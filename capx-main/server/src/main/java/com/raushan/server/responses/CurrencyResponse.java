package com.chaitanya.server.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurrencyResponse {

  @JsonProperty("1. From_Currency Code")
  private String fromCurrency;

  @JsonProperty("3. To_Currency Code")
  private String toCurrency;

  @JsonProperty("5. Exchange Rate")
  private String exchangeRate;

  @JsonProperty("6. Last Refreshed")
  private String lastRefreshed;
}