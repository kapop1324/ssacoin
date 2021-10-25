package com.ecommerce.controller;

import com.ecommerce.domain.Wallet;
import com.ecommerce.model.service.WalletServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/wallet")
public class WalletController {

	@Autowired
	WalletServiceImpl walletService;

	@PostMapping("/register")
	public ResponseEntity registerWallet(@RequestBody Wallet wallet) {
		Wallet registed = walletService.register(wallet);
		HashMap<String,Object> result = new HashMap<String,Object>();
		String message = "";
		if(registed == null) message = "fail";
		else message = "Success";
		result.put("message",message);
		return new ResponseEntity(result,HttpStatus.OK);
	}

	@GetMapping("/{userId}")
	public ResponseEntity getWalletByUserId(@PathVariable String userId){
		Wallet wallet = walletService.getByUserId(userId);
		HashMap<String,Object> result = new HashMap<String,Object>();
		if(wallet == null) result.put("message","fail");
		else result.put("message","Success");
		result.put("wallet",wallet);
		return new ResponseEntity(result, HttpStatus.OK);
	}

}
