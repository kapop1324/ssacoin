package com.ecommerce.model.service;

import java.math.BigInteger;

import com.ecommerce.domain.Address;
import com.ecommerce.domain.Wallet;

public interface EthereumService {
//
//	BigInteger getBalance(String addr);
//	
//	void reqeth(String address) throws Exception;
	
	
	
	long geterc20Balance(String address) throws Exception;

	long getAdminBalance() throws Exception; 

	void geterc20Send(String address, String amount) throws Exception;


	Wallet newAccount(String userid);

	void reqeth(String address) throws Exception;

}
