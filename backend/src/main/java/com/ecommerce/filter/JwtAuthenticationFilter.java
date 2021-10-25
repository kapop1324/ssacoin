package com.ecommerce.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ecommerce.auth.PrincipalDetails;
import com.ecommerce.domain.User;
import com.ecommerce.model.service.RedisService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;



/**
 * 요청 헤더에 jwt 토큰이 있는 경우, 토큰 검증 및 인증 처리 로직 정의.
 */

// /user/login 요청해서 usernamme, password전송하면 post 이필터가 동작을함
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

	private final AuthenticationManager authenticationManager;
	
	private final RedisService redisservice;
			
	//로그인 요청하면 로그인 시도를 위해서 실행되는 함수
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		
		ObjectMapper om = new ObjectMapper();
		User user = null;
		try {

			
			user = om.readValue(request.getInputStream(), User.class);
		
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(user.getId(), user.getPw());
		
		//principaldetailsserrvice의 loadUseByyUsername 함수가 실행됨
		Authentication authentication =
				authenticationManager.authenticate(authenticationToken);
		
		//authentication 객체가 세션영역에 저장됨 ==> 로그인이 되었다는것
		PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
	
		return authentication;
		
		
	
	}
	
	//위엣놈 실행하구 인증이 정상적으로 되었으면 이거시행
	//여기서 jwt토큰 만들어서 request요청한 사용자에게 jwt토큰을 response해주면됨
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
		System.out.println("시큐리티 작동중");
		
		String token = JWT.create()
				.withSubject("ssacoin")
				.withExpiresAt(new Date(System.currentTimeMillis()+(60000 * 10)))
				.withClaim("id", principalDetails.getUser().getId())
				.sign(Algorithm.HMAC512("sub2"));
		
		String refreshtoken = JWT.create()
				.withSubject("ssacoin")
				.withExpiresAt(new Date(System.currentTimeMillis()+(60000 * 1000)))
				.withClaim("id", principalDetails.getUser().getId())
				.sign(Algorithm.HMAC512("sub2"));
		
		redisservice.setData(principalDetails.getUser().getId(), refreshtoken);
		
		System.out.println(principalDetails);
		
		String message = "success";
		String role = principalDetails.getUser().getRole();
		String id = principalDetails.getUser().getId();
		
		PrintWriter out = response.getWriter();
		
		JsonObject json = new JsonObject();
		json.addProperty("message", "success");
		json.addProperty("role", role);
		json.addProperty("id", id);
		System.out.println(role);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("authorization", token);
		out.print(json.toString());
	}
	
}
