package com.ecommerce.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ecommerce.auth.PrincipalDetails;
import com.ecommerce.domain.User;
import com.ecommerce.model.dao.qdsl.UserDaoQdsl;
import com.ecommerce.model.service.RedisService;
import org.apache.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

// 시큐리티가 필ㄹ터를 가지고 있는 데 그 필터중에 basicauthenticationfilter라는 것이 있음
// 권한이나 인증이 필요한 특정 주소를 요철 했을 때 위 필터를 무조건 타게되어있음
// 만약에 권한이나 인증이 필요한 주소가 아니라면 이 필터를 안탐

public class JwtAuthorizationFilter  extends BasicAuthenticationFilter {
	
	private UserDaoQdsl userRepositorySupport;
	
	private  RedisService redisservice;
	
	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserDaoQdsl userRepositorySupport,RedisService redisservice) {
		super(authenticationManager);
		this.userRepositorySupport = userRepositorySupport;
		this.redisservice = redisservice;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		String token = request.getHeader("authorization");
	
		String id = request.getHeader("id");
		String refreshtoken = null;
		
		if(token == null) {
			chain.doFilter(request, response);
			return;
		}
	
		
		try {
			String tokenid = JWT.require(Algorithm.HMAC512("sub2")).build().verify(token).getClaim("id").asString();
			
				
				User user = userRepositorySupport.userinfo(id);
				// 인증은 토큰 검증시 끝. 인증을 하기 위해서가 아닌 스프링 시큐리티가 수행해주는 권한 처리를 위해 
				// 아래와 같이 토큰을 만들어서 Authentication 객체를 강제로 만들고 그걸 세션에 저장!
				PrincipalDetails principalDetails = new PrincipalDetails(user);
				Authentication authentication =
						new UsernamePasswordAuthenticationToken(
								principalDetails, //나중에 컨트롤러에서 DI해서 쓸 때 사용하기 편함.
								"", // 패스워드는 모르니까 null 처리, 어차피 지금 인증하는게 아니니까!!
								principalDetails.getAuthorities());
				// 강제로 시큐리티의 세션에 접근하여 값 저장
				SecurityContextHolder.getContext().setAuthentication(authentication);
				chain.doFilter(request, response);
			
			
			
		} catch (Exception e) {
		
			try {
	System.out.println("토큰만료");
				refreshtoken = redisservice.getData(id);
				String refreshtokenid = JWT.require(Algorithm.HMAC512("sub2")).build().verify(refreshtoken).getClaim("id").asString();
				
				token =  JWT.create()
						.withSubject("ssacoin")
						.withExpiresAt(new Date(System.currentTimeMillis()+(60000 * 10)))
						.withClaim("id", refreshtokenid)
						.sign(Algorithm.HMAC512("sub2"));
		
			
			} catch (Exception e2) {
				response.setStatus(HttpStatus.SC_OK);
				System.out.println("리프레시토큰 만료됨");
				String newrefreshtoken =  JWT.create()
						.withSubject("ssacoin")
						.withExpiresAt(new Date(System.currentTimeMillis()+(60000 * 10000)))
						.withClaim("id", id)
						.sign(Algorithm.HMAC512("sub2"));
				
				redisservice.setData(id, newrefreshtoken);
				chain.doFilter(request, response);
				return;
			}

			chain.doFilter(request, response);
		}
		
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("authorization", token);
		chain.doFilter(request, response);
		
	}

	
	
	
	



	
	
	
}
