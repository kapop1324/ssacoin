package com.ecommerce.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.ecommerce.domain.*;
import com.ecommerce.model.dao.IRequestRepository;
import com.ecommerce.model.dao.ITradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.dao.ICouponRepository;
import com.ecommerce.model.dao.qdsl.MypageRepository;

@Service
public class MypageService implements IMypageService{

	@Autowired
	private ICouponRepository couponRepository;

	@Autowired
	ITradeRepository tradeRepository;
	
	@Autowired
	private MypageRepository mypageRepositorySupport;

	@Autowired
	IRequestRepository requestRepository;

	@Override
	public List<ResCoupon> getCoupons(String coupon_owner) {
		
		return mypageRepositorySupport.getCoupons(coupon_owner);
	}

	@Override
	public long DeleteCoupon(String coupon_id) {
		return mypageRepositorySupport.deleteCoupons(coupon_id);
	}

	@Override
	public HashMap<String,Object> getHistory(String id) {
		List<HistoryTrade> tradeBuyList = mypageRepositorySupport.getP2pbuyHistory(id);
		List<HistoryTrade> tradeSellList = mypageRepositorySupport.getP2psellHistory(id);
		List<ResRequest> requestList = mypageRepositorySupport.getRequestHistory(id);
		HashMap<String,Object> history = new HashMap<String,Object>();
		history.put("tradeBuyList",tradeBuyList);
		history.put("tradeSellList",tradeSellList);
		history.put("requestList",requestList);
		return history;
	}


}
