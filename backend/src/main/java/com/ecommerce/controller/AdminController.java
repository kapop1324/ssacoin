package com.ecommerce.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


import com.ecommerce.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.controller.handler.FileHandler;
import com.ecommerce.model.service.IAdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	public static final Logger logger = LoggerFactory.getLogger(MypageController.class);

	@Autowired
	private FileHandler fileHandler;

	@Autowired
	private IAdminService adminService;

	@GetMapping("/list")
	public ResponseEntity<HashMap<String, Object>> requestList() {
		String result = "Success";
		HashMap<String, Object> resultMap = new HashMap<>();

		try {
			ArrayList<ResRequest> Requests = adminService.getRequest();

			resultMap.put("Requests", Requests);

			if (Requests == null) {
				result = "Fail";
			} else {
				result = "Success";
			}

			resultMap.put("message", result);

		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
		}
		return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
	}

	@GetMapping("/userlist")
	public ResponseEntity<HashMap<String, Object>> userList() {
		String result = "Success";
		HashMap<String, Object> resultMap = new HashMap<>();

		try {
			List<User> Userlist = adminService.getUserlist();

			resultMap.put("Userlist", Userlist);

			if (Userlist == null) {
				result = "Fail";
			} else {
				result = "Success";
			}

			resultMap.put("message", result);

		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
		}
		return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
	}

	@PostMapping("/approve")
	public ResponseEntity<HashMap<String, Object>> approveRequest(@RequestParam String request_idx,
			@ModelAttribute Coupon coupon,
			@RequestParam("image") MultipartFile image) {
		String result = "Success";
		HashMap<String, Object> resultMap = new HashMap<>();
		if (coupon.getCouponId() == null || coupon.getCouponEnd() == null) {
			result = "no CouponId Or no CouponEnd";
			resultMap.put("message", result);
			return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
		}
		if (image != null) {
			String filePath = fileHandler.upload(image);
			System.out.println(filePath);
			coupon.setCouponImg(filePath);
		}
		
		try {
			String requestMessage = adminService.requestApprove(request_idx,coupon);
			if (requestMessage.equals("1")) {
				result = "Success";
			} else {
				result = "No money";
			}
			resultMap.put("message", result);

		} catch (Exception e) {
			e.printStackTrace();
			result = "Error";
		}
		return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
	}

//	@PostMapping("/coupon")
//	public ResponseEntity<HashMap<String, Object>> couponIssuance(@ModelAttribute Coupon coupon,
//			@RequestParam("image") MultipartFile image) throws Exception {
//		HashMap<String, Object> resultMap = new HashMap<>();
//		String result = "Success";
//		System.out.println(new File("").getAbsolutePath());
//		if (coupon.getCouponId() == null || coupon.getCouponName() == null || coupon.getCouponCategory() == null
//				|| coupon.getCouponOwner() == null || coupon.getCouponExchange() == null) {
//			result = "Fail";
//			resultMap.put("message", result);
//			return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
//		}
//		if (image != null) {
//			String filePath = fileHandler.upload(image);
//			System.out.println(filePath);
//			coupon.setCouponImg(filePath);
//		}
//		Coupon cou = adminService.RegisterCoupon(coupon);
//		resultMap.put("message", result);
//
//		return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
//	}
}
