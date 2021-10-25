package com.ecommerce.model.service;

import java.util.ArrayList;

import com.ecommerce.domain.Transaction;

public interface ITransactionService {

	ArrayList<Transaction> getAll();

	Transaction getBlockHash(String blockNumber);

}
