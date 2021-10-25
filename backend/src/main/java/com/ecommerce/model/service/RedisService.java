package com.ecommerce.model.service;

public interface RedisService {
	
	public String getData(String key);
	
	public void setData(String key, String value);
	
	public void setDataExpire(String key, String value, long duration);
	
	public void deleteData(String key);
	
}
