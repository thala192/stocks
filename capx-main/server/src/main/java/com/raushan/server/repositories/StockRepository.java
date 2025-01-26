package com.chaitanya.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raushan.server.models.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {}