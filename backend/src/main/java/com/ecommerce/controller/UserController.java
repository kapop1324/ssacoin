package com.ecommerce.controller;

import com.ecommerce.domain.User;
import com.ecommerce.domain.Wallet;
import com.ecommerce.domain.exception.DomainException;
import com.ecommerce.domain.exception.EmptyListException;
import com.ecommerce.domain.exception.NotFoundException;
import com.ecommerce.model.service.EthereumService;
import com.ecommerce.model.service.RedisService;
import com.ecommerce.model.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@RestController
//@RequestMapping("/user")
public class UserController {
    public static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    private UserService userService;
    
    @Autowired
	private BCryptPasswordEncoder passencoder;
    
    @Autowired
    private RedisService redisservice;

	@Autowired
	private EthereumService ethereumService;
    
    @Autowired
    private HttpServletResponse response;
    
    @GetMapping("/user/logout")
    public ResponseEntity<HashMap> logout(@RequestParam String id){
    	
    	HashMap result = new HashMap();
    			
    	String message = "";
    	
    	try {
    		
    		message ="success";
    		redisservice.deleteData(id);
			
		} catch (Exception e) {
			e.printStackTrace();
			message = "error";
			result.put("message", message);
		}
    	
    	result.put("message", message);
    	
    	return new ResponseEntity<HashMap>(result,HttpStatus.OK);
    }


    @PostMapping("/login")
    public ResponseEntity<HashMap> login(@RequestBody User user){
    	
    	HashMap result = new HashMap();

    	String message = "";
    	
    	return new ResponseEntity<HashMap>(HttpStatus.OK);
    }
    
    
    @PostMapping("/join")
    public ResponseEntity<HashMap> join(@RequestBody User user){
    	
    	HashMap result = new HashMap();
    			System.out.println(user);
    	String message = "";
    	
    	try {
    		String password = passencoder.encode(user.getPw());
    		user.setPw(password);
    		System.out.println(password);
    		User insert = userService.join(user);
    		if(insert != null) {
    			message = "success";
				Wallet wallet = ethereumService.newAccount(user.getId());
				
    			result.put("message", message);
    		}else {
    			message = "fail";
    			result.put("message", message);
    		}
    		
    		
		} catch (Exception e) {
			e.printStackTrace();
			message = "error";
		}
    	
    	
    	
    	return new ResponseEntity<HashMap>(result,HttpStatus.OK);
    }
    
    @GetMapping("/idcheck")
    public ResponseEntity<HashMap> idcheck(@RequestParam String id){
    	
    	HashMap result = new HashMap();
    			
    	String message = "";
    	
    	try {
    		
    		String idcheck = userService.idcheck(id);
   
    		if(idcheck == null) {
    			
    			message = "success";
    			result.put("message", message);
    			
    		}else {
    			
    			message = "fail";
    			result.put("message", message);
    			
    		}
    		
		} catch (Exception e) {
			e.printStackTrace();
			message = "error";
			result.put("message", message);
		}
    	
    	result.put("message", message);
    	
    	return new ResponseEntity<HashMap>(result,HttpStatus.OK);
    }
    
    @GetMapping("/studentidcheck")
    public ResponseEntity<HashMap> studentidcheck(@RequestParam String studentid){
    	
    	HashMap result = new HashMap();
    			
    	String message = "";
    	
    	try {
    		
    		String studentidcheck = userService.studentidcheck(studentid);
   
    		if(studentidcheck == null) {
    			
    			message = "success";
    			result.put("message", message);
    			
    		}else {
    			
    			message = "fail";
    			result.put("message", message);
    			
    		}
    		
		} catch (Exception e) {
			e.printStackTrace();
			message = "error";
			result.put("message", message);
		}
    	
    	result.put("message", message);
    	
    	return new ResponseEntity<HashMap>(result,HttpStatus.OK);
    }
    
    
    @GetMapping("/userinfo")
    public ResponseEntity<HashMap> userinfo(@RequestParam String id){
    	
    	HashMap result = new HashMap();
    	
    
    			
    	String message = "";
    	
    	try {
    		
    		User user = userService.userinfo(id);
    		
    		if(user == null) {
    			
    			message = "fail";
    			
    		}else {
    			
    			message = "success";
    			
    			result.put("message", message);
    			result.put("user", user);
    			
    		}
    		
			
		} catch (Exception e) {
			e.printStackTrace();
			message = "error";
			result.put("message", message);
		}
    	
    	result.put("message", message);
    	
    	return new ResponseEntity<HashMap>(result,HttpStatus.OK);
    }
    
    
    @DeleteMapping("/leave")
    public ResponseEntity<HashMap> leave(@RequestParam String id){
    	
    	HashMap result = new HashMap();
    	
    
    			
    	String message = "";
    	
    	try {
    		
    		long leave = userService.leave(id);;
    		
    		if(leave == 0) {
    			
    			message = "fail";
    			
    		}else {
    			
    			message = "success";
    			result.put("message", message);
    			
    		}
    		
			
		} catch (Exception e) {
			e.printStackTrace();
			message = "error";
			result.put("message", message);
		}
    	
    	result.put("message", message);
    	
    	return new ResponseEntity<HashMap>(result,HttpStatus.OK);
    }


}
