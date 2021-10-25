package com.ecommerce.model.service;

import java.io.IOException;
import java.util.ArrayList;

import com.ecommerce.domain.Coupon;
import com.ecommerce.domain.Request;
import com.ecommerce.domain.ResRequest;
import com.ecommerce.domain.User;
import org.springframework.web.multipart.MultipartFile;
import org.web3j.crypto.CipherException;
import java.util.List;

public interface IAdminService {

	ArrayList<ResRequest> getRequest();

	String requestApprove(String request_idx, Coupon coupon) throws Exception;

	Coupon RegisterCoupon(Coupon coupon) throws Exception;

	List<User> getUserlist();
}
