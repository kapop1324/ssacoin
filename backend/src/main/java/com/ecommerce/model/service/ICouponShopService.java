package com.ecommerce.model.service;

import com.ecommerce.domain.Product;
import com.ecommerce.domain.Request;

import java.util.List;

public interface ICouponShopService {
    List<Product> selectAll();
    Product SelectOne(int couponId);
    List<Product> selectByCategory(String category);
    boolean buy(Request request);
}
