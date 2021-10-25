package com.ecommerce.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.ecommerce.domain.Coupon;
import com.ecommerce.domain.ResCoupon;
import com.ecommerce.domain.Trade;

public interface IMypageService {

	List<ResCoupon> getCoupons(String coupon_owner);

	long DeleteCoupon(String coupon_id);

	HashMap<String,Object> getHistory(String id);

}
