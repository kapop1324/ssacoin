package com.ecommerce.domain;

import lombok.Data;
import org.springframework.util.Assert;
import org.web3j.protocol.core.methods.response.EthBlock;

import java.math.BigInteger;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Transaction {
	@Id
	@GeneratedValue
	private Integer id;
	
	private String hash;
	
	@Column(name="block_hash")
	private String blockHash;
	
	@Column(name="block_number")
	private String blockNumber;
	
	@Column(name="transaction_index")
	private String transactionIndex;
	
	@Column(name="from_id")
	private String from;
	
	@Column(name="to_id")
	private String to;
	
	private String value;
	
	@Column(name="gas_price")
	private String gasPrice;
	
	private String status;

}
