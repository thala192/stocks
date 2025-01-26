package com.chaitanya.server.utils;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class DateUtils {

  public static String formatDate(Instant instant) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy")
        .withZone(ZoneId.of("Asia/Kolkata"));
    return formatter.format(instant);
  }

  public static String formatTime(Instant instant) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss")
        .withZone(ZoneId.of("Asia/Kolkata"));
    return formatter.format(instant);
  }
}