package com.ecommerce.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Entity
public class Product {

    @Id
    @Column(name="product_id")
    @GeneratedValue
    private Integer productId;

    @Column(name="product_name")
    private String productName;

    @Column(name="product_category")
    private String productCategory;

    @Column(name="product_exchange")
    private String productExchange;

    @Column(name="product_img")
    private String productImg;
    
    @Column(name="product_mileage")
    private Integer productMileage;
}
