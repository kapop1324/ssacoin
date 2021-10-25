package com.ecommerce.model.service;

import com.ecommerce.domain.User;
import com.ecommerce.domain.exception.ApplicationException;
import com.ecommerce.model.dao.UserDao;
import com.ecommerce.model.dao.qdsl.UserDaoQdsl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
	
    @Autowired
    private UserDao userDao;
    
    @Autowired
    private UserDaoQdsl userRepositorySupport;
    
	@Override
	public User login(String id) {
		
		return userRepositorySupport.login(id);
	}
	
	@Override
	public User join(User user) {
		
		return userDao.save(user);
	}
	
	@Override
	public String idcheck(String id) throws Exception {
		
		return userRepositorySupport.idcheck(id);
	}
	
	@Override
	public String studentidcheck(String studentid) throws Exception {
		
		return userRepositorySupport.studentidcheck(studentid);
	}
	
	@Override
	public User userinfo(String id) throws Exception {
		
		return userRepositorySupport.userinfo(id);
	}
	
	@Override
	public long leave(String id) throws Exception {

		return userRepositorySupport.leave(id);
		
	}

   

}
