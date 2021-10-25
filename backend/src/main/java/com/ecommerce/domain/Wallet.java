package com.ecommerce.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Wallet {

    @Id
    private String uid;
    
    @Column(name = "wallet_address")
    private String walletAddress;

    @Column(name = "wallet_password")
    private String walletPassword;

    @Column(name = "wallet_filepath")
    private String walletFilepath;

}
