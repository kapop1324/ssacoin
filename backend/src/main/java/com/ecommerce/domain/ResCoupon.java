package com.ecommerce.domain;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
public class ResCoupon {

    private String couponId;
    private String couponName;
    private String couponCategory;
    private Date couponEnd;
    private String couponOwner;
    private String couponExchange;
    private String couponImg;
    private Integer couponMileage;
    private String couponComment;


    private String productImg;

    public ResCoupon(Coupon c, String productImg){
        this.couponId = c.getCouponId();
        this.couponName = c.getCouponName();
        this.couponCategory = c.getCouponCategory();
        this.couponEnd = c.getCouponEnd();
        this.couponOwner = c.getCouponOwner();
        this.couponExchange = c.getCouponExchange();
        this.couponImg = c.getCouponImg();
        this.couponMileage = c.getCouponMileage();
        this.couponComment = c.getCouponComment();
        this.productImg = productImg;
    }
}
