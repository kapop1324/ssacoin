package com.ecommerce.model.dao;

import com.ecommerce.domain.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IRequestRepository extends JpaRepository<Request, Integer>{
    List<Request> findByRequestIdOrderByRequestDate(String id);
}
