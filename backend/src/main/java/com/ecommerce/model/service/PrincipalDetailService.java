package com.ecommerce.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.auth.PrincipalDetails;
import com.ecommerce.domain.User;
import com.ecommerce.model.dao.UserDao;
import com.ecommerce.model.dao.qdsl.UserDaoQdsl;

import lombok.RequiredArgsConstructor;

@Service
public class PrincipalDetailService implements UserDetailsService{
	
	 @Autowired
	private UserDaoQdsl userRepositorySupport;
	
	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		
	
		User userentity = userRepositorySupport.userinfo(id);
	
		return new PrincipalDetails(userentity);
	}

}
