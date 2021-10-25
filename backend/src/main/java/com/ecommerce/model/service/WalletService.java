package com.ecommerce.model.service;

import com.ecommerce.domain.Wallet;

import java.math.BigInteger;

public interface WalletService {

	Wallet register(Wallet wallet);
	Wallet getByUserId(String userid);
 
}
