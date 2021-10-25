package com.ecommerce.model.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.domain.Request;

public interface IAdminRepository extends JpaRepository<Request, Integer> {

	Optional<Request> findByRequestId(Integer request_idx);
}
