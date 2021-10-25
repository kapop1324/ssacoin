package com.ecommerce.model.dao;

import com.ecommerce.domain.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IWalletRepository extends JpaRepository<Wallet, String>{
    Wallet findByUid(String userid);
}
