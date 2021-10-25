package com.ecommerce.model.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;

import com.ecommerce.domain.Wallet;
import com.ecommerce.model.dao.IWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Transfer;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Convert;
import org.web3j.utils.Convert.Unit;

import com.ecommerce.domain.CommonUtil;
import com.ecommerce.domain.Transaction;
import com.ecommerce.model.dao.ITransactionRepository;
import com.ecommerce.wrapper.CashContract;

@PropertySource("classpath:application.properties")
@Service
public class EthereumServiceImpl implements EthereumService {

	public static final BigInteger GAS_PRICE = BigInteger.valueOf(100_000_000_000L);
	public static final BigInteger GAS_LIMIT = BigInteger.valueOf(1_300_000);
	
	@Value("${eth.erc20.contract}")
	private String ERC20_TOKEN_CONTRACT;

	@Value("${eth.admin.address}")
	private String ADMIN_ADDRESS;

	@Value("${eth.encrypted.password}")
	private String PASSWORD;

	@Value("${eth.admin.wallet.filename}")
	private String ADMIN_WALLET_FILE;

	@Value("${spring.web3j.client-address}")
	private String NETWORK_URL;
	
	@Value("${eth.admin.primaryKey}")
	private String primaryKey;

	@Autowired
	private Web3j web3j;
	
	@Autowired
	private ITransactionRepository itransactionRepository;

	@Autowired
	private IWalletRepository walletRepository;

	private CashContract cashContract;
	private ContractGasProvider contractGasProvider = new DefaultGasProvider();
	private Credentials credentials;
	

	@Override
	public long geterc20Balance(String address) throws Exception {
		
		web3j = Web3j.build(new HttpService(NETWORK_URL)); 
		credentials = Credentials.create(primaryKey);

		cashContract = CashContract.load(ERC20_TOKEN_CONTRACT, web3j, credentials, contractGasProvider);

		return cashContract.balanceOf(address).send().longValue();

	}
	
	@Override
	public long getAdminBalance() throws Exception {
		web3j = Web3j.build(new HttpService(NETWORK_URL)); // defaults to http://localhost:8545/
//		credentials = Credentials.create(primaryKey);

		ClassPathResource resource = new ClassPathResource(ADMIN_WALLET_FILE);
		byte[] bdata = FileCopyUtils.copyToByteArray(resource.getInputStream());
		String data = new String(bdata, StandardCharsets.UTF_8);

		Credentials credentials = WalletUtils.loadJsonCredentials("admin",data);
		cashContract = CashContract.load(ERC20_TOKEN_CONTRACT, web3j, credentials, contractGasProvider);
		return cashContract.balanceOf(ADMIN_ADDRESS).send().longValue();
	}

	@SuppressWarnings("deprecation")
	@Override
	public void geterc20Send(String address,String amount) throws Exception {
		web3j = Web3j.build(new HttpService(NETWORK_URL)); // defaults to http://localhost:8545/

		ClassPathResource resource = new ClassPathResource(ADMIN_WALLET_FILE);
		byte[] bdata = FileCopyUtils.copyToByteArray(resource.getInputStream());
		String data = new String(bdata, StandardCharsets.UTF_8);

		Credentials credentials = WalletUtils.loadJsonCredentials("admin",data);

		cashContract = CashContract.load(ERC20_TOKEN_CONTRACT, web3j, credentials, contractGasProvider);
		BigDecimal cashAmount = new BigDecimal(Integer.parseInt(amount));
		BigInteger cash = cashAmount.toBigInteger();
		TransactionReceipt tr3 = cashContract.transfer(address, cash).send();

		
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
	}

	public Wallet newAccount(String userid){
		web3j = Web3j.build(new HttpService(NETWORK_URL));
		String walletPath = "/home/ubuntu/geth/eth_localdata/keystore/";
		//저장할거 walletPath, password, address
		try {

			String walletFileName = WalletUtils.generateFullNewWalletFile("password",new File(walletPath));
			String walletfilepath = walletPath + walletFileName;
			System.out.println(walletfilepath);

			String[] fetchAddress=walletFileName.split("--");

			FileInputStream resource = new FileInputStream(walletfilepath);
			byte[] bdata = FileCopyUtils.copyToByteArray(resource);
			String data = new String(bdata, StandardCharsets.UTF_8);

			System.out.println(data);
			Credentials credentials = WalletUtils.loadJsonCredentials("password",data);
			System.out.println(credentials);

			String getAddress = "0x" + fetchAddress[fetchAddress.length-1].split("\\.")[0];
			System.out.println(getAddress);
			Wallet wallet = new Wallet(userid,getAddress,"password",walletfilepath);
			walletRepository.save(wallet);
			return wallet;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
			return null;
		} catch (InvalidAlgorithmParameterException e) {
			e.printStackTrace();
			return null;
		} catch (CipherException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	//이더리움 전송
	@Override
	public void reqeth(String address) throws Exception {

		ClassPathResource resource = new ClassPathResource(ADMIN_WALLET_FILE);

        byte[] bdata = FileCopyUtils.copyToByteArray(resource.getInputStream());
        String data = new String(bdata, StandardCharsets.UTF_8);

        web3j = Web3j.build(new HttpService(NETWORK_URL)); // defaults to http://localhost:8545/
        CommonUtil commmonUtil = new CommonUtil();
        Credentials credentials = commmonUtil.getCredential(ADMIN_WALLET_FILE, PASSWORD);
        TransactionReceipt transactionReceipt = Transfer
                .sendFunds(web3j, credentials, address, BigDecimal.valueOf(5), Convert.Unit.ETHER).send();

	}

}
