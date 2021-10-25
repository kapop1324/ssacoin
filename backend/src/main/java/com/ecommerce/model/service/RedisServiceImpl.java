package com.ecommerce.model.service;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

@Service
public class RedisServiceImpl implements RedisService{
	
	@Autowired
	private StringRedisTemplate stringredistemplate;

	@Override
	public String getData(String key) {
		
		ValueOperations<String,String> valueOperations = stringredistemplate.opsForValue();
        return valueOperations.get(key);
	}

	@Override
	public void setData(String key, String value) {
		
		ValueOperations<String,String> valueOperations = stringredistemplate.opsForValue();
        valueOperations.set(key,value);
		
	}

	@Override
	public void setDataExpire(String key, String value, long duration) {
		
		ValueOperations<String,String> valueOperations = stringredistemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key,value,expireDuration);
		
	}

	@Override
	public void deleteData(String key) {
		stringredistemplate.delete(key);
		
	}



}
