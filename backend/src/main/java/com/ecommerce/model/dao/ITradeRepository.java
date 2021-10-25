package com.ecommerce.model.dao;

import com.ecommerce.domain.Coupon;
import com.ecommerce.domain.Trade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITradeRepository extends JpaRepository<Trade, Integer>{
    List<Trade> findByTradeResponseIdOrderByTradeDate(String idd);
    List<Trade> findByTradeRequestIdOrderByTradeDate(String id);
}
