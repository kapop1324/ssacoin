package com.ecommerce.model.dao;

import com.ecommerce.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, String>{
    List<Product> findAllByProductCategory(String category);
    Product findByProductId(Integer productId);
}
