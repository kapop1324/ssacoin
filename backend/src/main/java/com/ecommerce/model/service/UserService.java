package com.ecommerce.model.service;

import com.ecommerce.domain.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface UserService {

	public User login(String id) throws Exception;
    
    public User join(User user) throws Exception;
    
    public String idcheck(String id) throws Exception;
    
    public String studentidcheck(String studentid) throws Exception;
    
    public User userinfo(String id) throws Exception;
    
    @Transactional
    public long leave(String id) throws Exception;




}
