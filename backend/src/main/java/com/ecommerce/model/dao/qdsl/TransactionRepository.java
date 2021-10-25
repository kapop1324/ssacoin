package com.ecommerce.model.dao.qdsl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecommerce.domain.QTransaction;
import com.ecommerce.domain.Transaction;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class TransactionRepository {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	QTransaction qTransaction = QTransaction.transaction;
	
	public ArrayList<Transaction> getAll(){
		ArrayList<Transaction> transactions = (ArrayList<Transaction>) jpaQueryFactory.select(qTransaction)
				.from(qTransaction).fetch();
        return transactions;
	}
	
	public Transaction getBlockHash(String blockNumber){
		Transaction transaction = jpaQueryFactory.select(qTransaction)
				.from(qTransaction).where(qTransaction.blockNumber.eq(blockNumber)).fetchOne();
        return transaction;
	}


}
