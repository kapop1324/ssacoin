package com.ecommerce;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ecommerce.filter.JwtAuthenticationFilter;
import com.ecommerce.filter.JwtAuthorizationFilter;
import com.ecommerce.model.dao.qdsl.UserDaoQdsl;
import com.ecommerce.model.service.RedisService;

import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity

public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private  CorsConfig corsconfig;
	
	
	 @Autowired
	private UserDaoQdsl userRepositorySupport;
	 
	 @Autowired
	 private RedisService redisservice;

	   @Bean
	    public BCryptPasswordEncoder  getPasswordEncoder() {
	        return new BCryptPasswordEncoder();
	    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http
    		.addFilter(corsconfig.corsFilter()) 
    		.csrf().disable()
    		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //????????? ???????????? ?????????.
    		.and()
    		.formLogin().disable() // ???????????? ?????????
    		.httpBasic().disable() //?????? http????????? ?????? ?????????
    		.addFilter(new JwtAuthenticationFilter(authenticationManager(),redisservice)) //AuthenticationManager
    		.addFilter(new JwtAuthorizationFilter(authenticationManager(),userRepositorySupport,redisservice))
    		.authorizeRequests()
    		.anyRequest().permitAll()
   ;
    	
    }
    
    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/v2/api-docs", "/swagger-resourcees/**", "/swagger-ui.html", "/webjars/**", "/swagger/**");
    }
}