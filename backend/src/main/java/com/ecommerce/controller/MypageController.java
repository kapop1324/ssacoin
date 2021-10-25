package com.ecommerce.controller;

import com.ecommerce.domain.Coupon;
import com.ecommerce.domain.ResCoupon;
import com.ecommerce.domain.Trade;
import com.ecommerce.model.service.IMypageService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/mypage")
public class MypageController {
    public static final Logger logger = LoggerFactory.getLogger(MypageController.class);
    
    @Autowired
    private IMypageService mypageService;


    @GetMapping("/coupon/{coupon_owner}")
    public ResponseEntity<HashMap<String, Object>> couponList(@PathVariable String coupon_owner) {
       String result = "SUCCESS";
       HashMap<String, Object> resultMap = new HashMap<>();
       HttpStatus status = HttpStatus.ACCEPTED;

       try {
    	   List<ResCoupon> Coupons = mypageService.getCoupons(coupon_owner);

          resultMap.put("Coupons", Coupons);

          if (Coupons == null) {
             result = "Fail";
          } else {
             result = "Success";
          }

          resultMap.put("message", result);
          status = HttpStatus.ACCEPTED;

       } catch (Exception e) {
          e.printStackTrace();
          resultMap.put("message", e.getMessage());
          status = HttpStatus.INTERNAL_SERVER_ERROR;
       }
       return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/coupon/{coupon_id}")
    public ResponseEntity<HashMap<String, Object>> DeleteCoupon(@PathVariable String coupon_id) {
        HashMap<String, Object> resultMap = new HashMap<>();
        String result = "Success";
    	try {
			long delete=mypageService.DeleteCoupon(coupon_id);
			
			if(delete==0) {
				result="Fail";
			}else {
				result="Success";
			}
		} catch (Exception e) {
			result="Error";
			resultMap.put("message", result);
			return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
		}
    	resultMap.put("message", result);
    	return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/history/{id}")
    public ResponseEntity<HashMap<String, Object>> coinHistory(@PathVariable String id) {
        String result = "SUCCESS";
        HashMap<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            resultMap = mypageService.getHistory(id);

            if (resultMap == null) {
                result = "Fail";
            } else {
                result = "Success";
            }

            resultMap.put("message", result);
            status = HttpStatus.ACCEPTED;

        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }
}
