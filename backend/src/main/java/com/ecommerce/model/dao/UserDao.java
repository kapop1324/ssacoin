package com.ecommerce.model.dao;

import com.ecommerce.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserDao extends JpaRepository<User, String>{
	List<User> findByRole(String role);


}
