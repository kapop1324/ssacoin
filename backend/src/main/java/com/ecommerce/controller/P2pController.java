package com.ecommerce.controller;

import com.ecommerce.domain.Coupon;
import com.ecommerce.domain.ResTrade;
import com.ecommerce.domain.Trade;
import com.ecommerce.model.service.P2pService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/p2p")
public class P2pController {
    public static final Logger logger = LoggerFactory.getLogger(P2pController.class);

    @Autowired
    P2pService p2pService;

    HashMap<String,Object> result = new HashMap<String,Object>();

    @GetMapping
    public ResponseEntity selectAll() {
        List<ResTrade> tradeList = p2pService.selectAll();
        result.clear();
        String message = "";
        if(tradeList.size() == 0) return new ResponseEntity(message, HttpStatus.OK);
        message = "Success";
        result.put("tradeList",tradeList);
        result.put("message",message);
        return new ResponseEntity(result,HttpStatus.OK);
    }

    @PostMapping("/category")
    public ResponseEntity selectCategory(@RequestBody Coupon coupon) {
        List<ResTrade> couponList = p2pService.selectByCategory(coupon.getCouponCategory());
        result.clear();
        String message = "";
        if(couponList.size() == 0) {
            message = "fail";
            result.put("message",message);
            return new ResponseEntity(result, HttpStatus.OK);
        }
        message = "Success";
        result.put("couponList",couponList);
        result.put("message",message);
        return new ResponseEntity(result,HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity registerCoupon(@RequestBody Trade trade) {
        boolean flag = p2pService.register(trade);
        result.clear();
        String message = "";
        if(!flag) {
            message = "fail";
            result.put("message",message);
            return new ResponseEntity(result, HttpStatus.OK);
        }
        message = "Success";
        result.put("message",message);
        return new ResponseEntity(result,HttpStatus.OK);
    }

    @GetMapping("/{couponId}")
    public ResponseEntity selectOne(@PathVariable String couponId){
        Coupon coupon = p2pService.selectOne(couponId);
        result.clear();
        String message = "";
        if(coupon == null) {
            message = "fail";
            result.put("message",message);
            return new ResponseEntity(result,HttpStatus.OK);
        }
        message = "Success";
        result.put("message",message);
        result.put("coupon",coupon);
        return new ResponseEntity(result,HttpStatus.OK);
    }

    @PostMapping("/buy")
    public ResponseEntity buyRequest(@RequestBody Trade trade) throws Exception{
        boolean flag = p2pService.buy(trade);
        result.clear();
        String message = "";
        if(!flag) message = "fail";
        else message = "Success";
        result.put("message",message);
        return new ResponseEntity(result,HttpStatus.OK);
    }

}
