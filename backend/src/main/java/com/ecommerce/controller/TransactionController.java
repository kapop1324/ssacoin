package com.ecommerce.controller;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.domain.Transaction;
import com.ecommerce.model.service.ITransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

	@Autowired
	ITransactionService transactionService;

	// 전체 트랜젝션 조회
	@GetMapping()
	public ResponseEntity<HashMap<String, Object>> getAllTransaction() {

		HashMap<String, Object> result = new HashMap<>();
		String message = "";
		try {

			ArrayList<Transaction> transaction = transactionService.getAll();

			if (transaction == null) {

				message = "fail";

			} else {

				message = "success";
				result.put("transaction", transaction);
			}
			result.put("message", message);

		} catch (Exception e) {
			e.printStackTrace();
			message = "error";
			result.put("message", message);
		}
		return new ResponseEntity<HashMap<String, Object>>(result, HttpStatus.OK);
	}

	@GetMapping("/{blockNumber}")
	public ResponseEntity<HashMap<String, Object>> blockHashTransaction(@PathVariable String blockNumber) {

		HashMap<String, Object> result = new HashMap<>();
		String message = "";
		try {

			Transaction transaction = transactionService.getBlockHash(blockNumber);
			if (transaction == null) {
				message = "fail";
			} else {
				message = "success";
				result.put("transaction", transaction);
			}
			result.put("message", message);
		} catch (Exception e) {
			e.printStackTrace();
			message = "error";
			result.put("message", message);
		}
		return new ResponseEntity<HashMap<String, Object>>(result, HttpStatus.OK);
	}
}
