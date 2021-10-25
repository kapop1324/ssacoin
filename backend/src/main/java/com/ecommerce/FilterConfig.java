package com.ecommerce;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ecommerce.filter.JwtAuthenticationFilter;

@Configuration
public class FilterConfig {
	
//	@Bean
//	public FilterRegistrationBean<JwtAuthenticationFilter> filter1(){
//		FilterRegistrationBean<JwtAuthenticationFilter> bean = new FilterRegistrationBean<>(new JwtAuthenticationFilter());
//		bean.addUrlPatterns("/*");
//		bean.setOrder(0);//낮은번호가 필터중에 가장먼저 실행
//		return bean;
//	}
	
}
