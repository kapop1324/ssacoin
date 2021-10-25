package com.ecommerce.domain;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
public class Coupon {

    @Id
    @Column(name="coupon_id")
    private String couponId;

    @Column(name="coupon_name")
    private String couponName;

    @Column(name="coupon_category")
    private String couponCategory;

    @Column(name="coupon_end")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date couponEnd;

    @Column(name="coupon_owner")
    private String couponOwner;

    @Column(name="coupon_exchange")
    private String couponExchange;

    @Column(name="coupon_img")
    private String couponImg;

    @Column(name="coupon_mileage")
    private Integer couponMileage;
    
    @Column(name="coupon_comment")
    private String couponComment;

    @Column(name="coupon_istrade")
    private Integer couponIstrade;
}
