package com.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;


@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication app = new  SpringApplication(Application.class);
		app.addListeners(new ApplicationPidFileWriter());
		app.run(args);
	}
	

}
