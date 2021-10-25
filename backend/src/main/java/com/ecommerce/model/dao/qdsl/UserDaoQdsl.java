package com.ecommerce.model.dao.qdsl;


import com.ecommerce.domain.QUser;
import com.ecommerce.domain.User;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;



@Repository
public class UserDaoQdsl{
	
	@Autowired
	private JPAQueryFactory jpaQueryFactory;

 
	QUser qUser = QUser.user;

    public User login(String id){
        User user = jpaQueryFactory.select(qUser).from(qUser).where(qUser.id.eq(id)).fetchOne();
        return user;
    }
    
    public String idcheck(String id) {
    	
    	String idcheck = jpaQueryFactory.select(qUser.id).from(qUser).where(qUser.id.eq(id)).fetchOne();
    	
    	return idcheck;
    }
    
    public String studentidcheck(String studentid) {
    	
    	String studentidcheck = jpaQueryFactory.select(qUser.studentid).from(qUser).where(qUser.studentid.eq(studentid)).fetchOne();
    	
    	return studentidcheck;
    }
    
    public User userinfo(String id) {
    	
    	User userinfo = jpaQueryFactory.select(qUser).from(qUser).where(qUser.id.eq(id)).fetchOne();
    	
    	return userinfo;
    	
    }
    
    public long leave(String id) {
    	
    	return jpaQueryFactory.delete(qUser).where(qUser.id.eq(id)).execute();
    }

}
