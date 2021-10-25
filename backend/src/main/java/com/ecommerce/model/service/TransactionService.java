package com.ecommerce.model.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.domain.Transaction;
import com.ecommerce.model.dao.qdsl.TransactionRepository;

@Service
public class TransactionService implements ITransactionService {

	@Autowired
	TransactionRepository transactionRepository;
	
	@Override
	public ArrayList<Transaction> getAll() {
		return transactionRepository.getAll();
	}

	@Override
	public Transaction getBlockHash(String blockNumber) {
		return transactionRepository.getBlockHash(blockNumber);
	}

	
}
