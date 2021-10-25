package com.ecommerce.model.dao;

import com.ecommerce.domain.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ICouponRepository extends JpaRepository<Coupon, String>{
    List<Coupon> findAllByCouponCategory(String category);
    Coupon findByCouponId(String couponId);
}
