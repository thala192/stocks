package com.chaitanya.server.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurrencyResponseWrapper {

  @JsonProperty("Realtime Currency Exchange Rate")
  private CurrencyResponse exchangeRateDetails;
}