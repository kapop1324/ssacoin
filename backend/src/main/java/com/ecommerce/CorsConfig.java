package com.ecommerce;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
	
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new  UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.setAllowedOriginPatterns(Arrays.asList("*"));
		config.addAllowedHeader("*"); //모든 header에 응답을 허용
		config.setExposedHeaders(Arrays.asList("authorization"));
		config.addAllowedMethod("*"); //모든 post, get, put, delete, patch 요청을 허용하겠다.
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

}
