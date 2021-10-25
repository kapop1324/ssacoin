package com.ecommerce.controller;

import com.ecommerce.domain.Product;
import com.ecommerce.domain.Request;
import com.ecommerce.model.service.CouponShopService;

import java.util.HashMap;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/shop")
public class CouponShopController {
    public static final Logger logger = LoggerFactory.getLogger(CouponShopController.class);
    
    @Autowired
    CouponShopService couponShopService;

    HashMap<String,Object> result = new HashMap<String,Object>();

    @GetMapping
    public ResponseEntity selectAll() {
        List<Product> productList = couponShopService.selectAll();
        result.clear();
        String message = "";
        System.out.println(productList.get(0));
        System.out.println("실행");
        if(productList.size() == 0) return new ResponseEntity(message, HttpStatus.OK);
        message = "Success";
        result.put("productList",productList);
        result.put("message",message);
        return new ResponseEntity(result,HttpStatus.OK);
    }

    @PostMapping("/category")
    public ResponseEntity selectCategory(@RequestBody Product product) {
        List<Product> productList = couponShopService.selectByCategory(product.getProductCategory());
        System.out.println(product.getProductCategory());
        result.clear();
        String message = "";
        if(productList == null) return new ResponseEntity(message, HttpStatus.OK);
        message = "Success";
        result.put("productList",productList);
        result.put("message",message);
        return new ResponseEntity(result,HttpStatus.OK);
    }

    @PostMapping("/buy")
    public ResponseEntity buyRequest(@RequestBody Request request){
        boolean flag = couponShopService.buy(request);
        String message = "";
        result.clear();

        if(!flag) {
            message = "fail";
        }
        else {
            message = "Success";
        }
        result.put("message",message);
        return new ResponseEntity(result,HttpStatus.OK);
    }

}
