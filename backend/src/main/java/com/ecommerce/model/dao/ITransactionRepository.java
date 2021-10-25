package com.ecommerce.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.domain.Transaction;

public interface ITransactionRepository extends JpaRepository<Transaction, Integer> {

}
