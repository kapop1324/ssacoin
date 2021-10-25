package com.ecommerce.model.service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import java.io.FileInputStream;
import java.util.List;

import com.ecommerce.domain.*;
import com.ecommerce.model.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;

import com.ecommerce.model.dao.IAdminRepository;
import com.ecommerce.model.dao.ICouponRepository;
import com.ecommerce.model.dao.ITransactionRepository;
import com.ecommerce.model.dao.qdsl.AdminRepository;
import com.ecommerce.wrapper.CashContract;

@Service
public class AdminService implements IAdminService {
	
	@Value("${spring.web3j.client-address}")
	private String NETWORK_URL;

	@Value("${eth.erc20.contract}")
	private String ERC20_TOKEN_CONTRACT;
	
	@Value("${eth.admin.address}")
	private String ADMIN_ADDRESS;

//	@Value("${eth.test.wallet.filename}")
//	private String TEST_WALLET_FILE;
	
//	@Value("${eth.test.address}")
//	private String TEST_WALLET_ADDRESS;
	
	@Autowired
	private Web3j web3j;
	
	private CashContract cashContract;
	private ContractGasProvider contractGasProvider = new DefaultGasProvider();
	private Credentials credentials;
	
	public static final BigInteger GAS_PRICE = BigInteger.valueOf(100_000_000_000L);
	public static final BigInteger GAS_LIMIT = BigInteger.valueOf(1_300_000);
	
	
	//요청에 대한 승인 작업
	@Autowired
	IAdminRepository adminRepository;
	
	//MyPage QueryDSL
	@Autowired
	AdminRepository adminRepositorySupport;
	
	
	//MyPage JPA
	@Autowired
	ICouponRepository couponRepository;

	@Autowired
	UserDao userDao;
	
	// 구매 상품에 대한 가격 확인 작업
	@Autowired
	ICouponShopService iCouponShopService;
	
	
	//지갑 경로 및 지갑 비밀번호 확인
	@Autowired
	WalletService walletService;
	
	//트랜잭션 처리
	@Autowired
	ITransactionRepository itransactionRepository;
	
	
	@Override
	public ArrayList<ResRequest> getRequest() {
		return adminRepositorySupport.getRequest();
	}
	
	@Override
	public Coupon RegisterCoupon(Coupon coupon) throws Exception {
		coupon.setCouponIstrade(0);
		return couponRepository.save(coupon);
	}

	@Override
	public List<User> getUserlist() {
		return userDao.findByRole("user");
	}


	@Override
	public String requestApprove(String request_idx,Coupon coupon) throws Exception {
		Request request= adminRepositorySupport.getOneRequest(request_idx);
		Product product = iCouponShopService.SelectOne(request.getRequestProductId());
		

		//w3j 구매자가 관리자에게 가격을 지불하는 부분
		Wallet wallet = walletService.getByUserId(request.getRequestId());

		//erc20 지갑 생성시 변경 사항 - 1
		FileInputStream resource = new FileInputStream(wallet.getWalletFilepath());
//		ClassPathResource resource = new ClassPathResource(TEST_WALLET_FILE);
		
		byte[] bdata = FileCopyUtils.copyToByteArray(resource);
        String data = new String(bdata, StandardCharsets.UTF_8);
        
        web3j = Web3j.build(new HttpService(NETWORK_URL));
        
        //erc20 지갑 생성시 변경 사항 - 1
        credentials = WalletUtils.loadJsonCredentials(wallet.getWalletPassword(), data);
        //credentials = WalletUtils.loadJsonCredentials("!q1324652", data);
        
        cashContract = CashContract.load(ERC20_TOKEN_CONTRACT, web3j, credentials, contractGasProvider);
        
        //지갑 잔액이 부족한 경우 예외 처리
        if(Long.valueOf(product.getProductMileage())>cashContract.balanceOf(wallet.getWalletAddress()).send().longValue()) {
        	return "2";
        }
        BigDecimal cashAmount = new BigDecimal(product.getProductMileage());
		BigInteger cash = cashAmount.toBigInteger();
		TransactionReceipt tr3 = cashContract.transfer(ADMIN_ADDRESS, cash).send();
		
		
		//트랜잭션 처리
		Transaction et = new Transaction();
		et.setHash(tr3.getTransactionHash());
		et.setBlockHash(tr3.getBlockHash());
		et.setBlockNumber(String.valueOf(tr3.getBlockNumber()));
		et.setTransactionIndex(String.valueOf(tr3.getTransactionIndex()));
		et.setFrom(tr3.getFrom());
		et.setTo(tr3.getTo());
		et.setValue(tr3.getLogs().get(0).getData());
		et.setGasPrice(String.valueOf(tr3.getGasUsed()));
		et.setStatus(tr3.getStatus());
		
		itransactionRepository.save(et);
		
		//쿠폰 등록
		coupon.setCouponName(product.getProductName());
		coupon.setCouponCategory(product.getProductCategory());
		coupon.setCouponOwner(request.getRequestId());
		coupon.setCouponExchange(product.getProductExchange());
		coupon.setCouponMileage(product.getProductMileage());
		coupon.setCouponIstrade(0);
		couponRepository.save(coupon);
		
		//요청 처리 완료
		request.setRequestStatus("1");
		adminRepository.save(request);
		return "1";
	}

}
