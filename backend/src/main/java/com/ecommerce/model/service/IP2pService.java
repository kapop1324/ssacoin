package com.ecommerce.model.service;

import java.util.List;
import com.ecommerce.domain.Coupon;
import com.ecommerce.domain.ResTrade;
import com.ecommerce.domain.Trade;

public interface IP2pService {

    List<ResTrade> selectAll();
    List<ResTrade> selectByCategory(String categoryId);
    Coupon selectOne(String coupon_id);
    boolean register(Trade trade);
    boolean buy(Trade trade) throws Exception;

}
