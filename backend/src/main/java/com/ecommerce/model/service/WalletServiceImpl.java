package com.ecommerce.model.service;

import com.ecommerce.domain.Wallet;
import com.ecommerce.model.dao.IWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.util.Optional;


@PropertySource("classpath:application.properties")
@Service
public class WalletServiceImpl implements WalletService {

	@Autowired
	IWalletRepository walletRepository;

	@Override
	public Wallet register(Wallet wallet) {
		Wallet wal = walletRepository.save(wallet);
		if(wal == null) return null;
		return wal;
	}

	@Override
	public Wallet getByUserId(String userid) {
		Wallet wallet = walletRepository.findByUid(userid);
		return wallet;
	}
}
