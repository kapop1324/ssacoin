package com.ecommerce.controller;

import com.ecommerce.domain.Wallet;
import com.ecommerce.model.service.WalletServiceImpl;
import io.swagger.annotations.ApiOperation;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.domain.Address;
import com.ecommerce.model.service.EthereumService;

@RestController
@RequestMapping("/erc")
public class SSAController {

	@Autowired
	private EthereumService ethereumservice;

	@Autowired
	WalletServiceImpl walletService;

//	@GetMapping("/address/{address}")
//	public void getAddress(@PathVariable String address) {
//				
//		
//		ethereumservice.getBalance(address);
//	}
//	
//	@GetMapping("/send/{address}")
//	public void getsend(@PathVariable String address) throws Exception {
//		
//		ethereumservice.reqeth(address);
//		
//		
//	}

	// 관리자의 SSA 코인 갯수 확인
	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	public ResponseEntity<HashMap<String, Object>> getAdminBalance() throws Exception {

		String result = "SUCCESS";
		HashMap<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;

		try {
			long val = ethereumservice.getAdminBalance();

			resultMap.put("AdminCoin", val);

			if (val < 0) {
				result = "Fail";
			} else {
				result = "Success";
			}

			resultMap.put("message", result);
			status = HttpStatus.ACCEPTED;

		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);

	}

	// 접속한 계정의 SSA 코인 갯수 확인
	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	public ResponseEntity<HashMap<String, Object>> getUserBalance(@PathVariable String id) throws Exception {
		
		String result = "SUCCESS";
		HashMap<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;

		try {
			Wallet wallet = walletService.getByUserId(id);
			long val = ethereumservice.geterc20Balance(wallet.getWalletAddress());

			resultMap.put("UserCoin", val);

			if (val < 0) {
				result = "Fail";
			} else {
				result = "Success";
			}

			resultMap.put("message", result);
			status = HttpStatus.ACCEPTED;

		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
	}

	// 관리자가 다른 계정으로 보내주는 경우
	@RequestMapping(value = "/send/{id}/{amount}", method = RequestMethod.GET)
	public ResponseEntity<HashMap<String, Object>> ercSend(@PathVariable String id, @PathVariable String amount) throws Exception {
		
		String result = "SUCCESS";
		HashMap<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;

		try {
			Wallet wallet = walletService.getByUserId(id);

			//이더지급
			ethereumservice.reqeth((wallet.getWalletAddress()));

			//erc20토큰 지급
			ethereumservice.geterc20Send(wallet.getWalletAddress(), amount);

			resultMap.put("message", result);
			status = HttpStatus.ACCEPTED;

		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
	}

	/**
	 * TODO Sub PJT Ⅲ 추가과제 이더리움 트랜잭션 동기화 데이터로 제공할 수 있는 추가 api의 예 - 주소로 관련 정보 가져오기
	 * 
	 * @param addr
	 * @return
	 */
	@ApiOperation(value = "Fetch an address info")
	@GetMapping("/address2/{addr}")
	public Address getBalance(@PathVariable String addr) {
//		Address address = ethereumservice.getAddress(addr);
//
//		if(address == null)
//			throw new NotFoundException(addr + " 주소 정보를 찾을 수 없습니다.");
//
		return null;
	}

}
