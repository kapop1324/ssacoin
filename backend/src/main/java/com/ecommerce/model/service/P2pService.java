package com.ecommerce.model.service;

import com.ecommerce.domain.*;
import com.ecommerce.model.dao.ICouponRepository;
import com.ecommerce.model.dao.ITradeRepository;
import com.ecommerce.model.dao.ITransactionRepository;
import com.ecommerce.model.dao.qdsl.P2pRepository;
import com.ecommerce.wrapper.CashContract;

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

import java.io.FileInputStream;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class P2pService implements IP2pService {

    @Autowired
    ICouponRepository couponRepository;
    @Autowired
    ITradeRepository tradeRepository;
    @Autowired
    P2pRepository p2pRepository;
    @Autowired
    WalletService walletService;
    @Autowired
    ITransactionRepository itransactionRepository;
    
    
    @Value("${spring.web3j.client-address}")
	private String NETWORK_URL;

	@Value("${eth.erc20.contract}")
	private String ERC20_TOKEN_CONTRACT;
	
	@Value("${eth.admin.address}")
	private String ADMIN_ADDRESS;
 
 @Value("${eth.admin.wallet.filename}")
	private String ADMIN_WALLET_FILE;
 
 @Value("${eth.admin.primaryKey}")
	private String primaryKey;
	
	@Autowired
	private Web3j web3j;
	
	private CashContract cashContract;
	private ContractGasProvider contractGasProvider = new DefaultGasProvider();
	private Credentials credentials;
	
    public static final BigInteger GAS_LIMIT = BigInteger.valueOf(71000); // you should get this from api
    public static final BigInteger GAS_PRICE = new BigInteger("d693a400", 16); // decimal 3600000000

    @Override
    public List<ResTrade> selectAll() {
        return p2pRepository.selectAll();
    }

    @Override
    public List<ResTrade> selectByCategory(String categoryId) {
        return p2pRepository.findAllByCouponCategory(categoryId);
    }

    @Override
    public Coupon selectOne(String coupon_id) {
        return couponRepository.findByCouponId(coupon_id);
    }

    @Override
    public boolean register(Trade trade) {
        System.out.println(trade.getTradeCouponId());
    	Date time  = new Date();
    	SimpleDateFormat date = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    	trade.setTradeDate(date.format(time));
        Coupon coupon = couponRepository.findByCouponId(trade.getTradeCouponId());
        if(coupon == null) return false;
        trade.setTradeStatus(0);
        tradeRepository.save(trade);
        coupon.setCouponIstrade(1);
        couponRepository.save(coupon);
        return true;
    }

    @Override
    public boolean buy(Trade trade) throws Exception {
    System.out.println("start");
    	//판매자 지갑 정보
    	Wallet saleWallet = walletService.getByUserId(trade.getTradeRequestId());
    	//구매자 지갑 정보
    	Wallet buyWallet = walletService.getByUserId(trade.getTradeResponseId());
    	
    	Coupon coupon = selectOne(trade.getTradeCouponId());
    	
    	
    	//w3j 전달 부분
    	FileInputStream resource = new FileInputStream(buyWallet.getWalletFilepath());
		
		byte[] bdata = FileCopyUtils.copyToByteArray(resource);
   //ClassPathResource resource = new ClassPathResource(ADMIN_WALLET_FILE);
   //byte[] bdata = FileCopyUtils.copyToByteArray(resource.getInputStream()); 
        String data = new String(bdata, StandardCharsets.UTF_8);
        
        web3j = Web3j.build(new HttpService(NETWORK_URL));
        credentials = WalletUtils.loadJsonCredentials(buyWallet.getWalletPassword(), data);
        //credentials = Credentials.create();
        

        cashContract = CashContract.load(ERC20_TOKEN_CONTRACT, web3j, credentials, contractGasProvider);
        
        //구매자의 잔액 조회
//        if(Long.valueOf(coupon.getCouponMileage())>cashContract.balanceOf(buyWallet.getWalletAddress()).send().longValue()) {
//
//        	return false;
//        }
        BigDecimal cashAmount = new BigDecimal(trade.getTradeMileage());

		BigInteger cash = cashAmount.toBigInteger();
		//TransactionReceipt tr3 = cashContract.transferFrom(buyWallet.getWalletAddress(),saleWallet.getWalletAddress(), cash).send();
   TransactionReceipt tr3 = cashContract.transfer(saleWallet.getWalletAddress(), cash).send();
   
		//coupon owner 수정
		coupon.setCouponOwner(buyWallet.getUid());
		coupon.setCouponIstrade(0);
		couponRepository.save(coupon);
		
   System.out.println(coupon.getCouponOwner());
   
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
		
   System.out.println(tr3);
        //trade 상태 수정
        trade.setTradeStatus(1);

		itransactionRepository.save(et);
        Trade tr = tradeRepository.save(trade);
        if(tr == null) return false;
        return true;
    }
}
