package com.ecommerce.model.dao.qdsl;

import java.util.ArrayList;
import java.util.List;

import com.ecommerce.domain.*;
import com.querydsl.core.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class MypageRepository {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	QCoupon qCoupon = QCoupon.coupon;
	QRequest qRequest = QRequest.request;
	QProduct qProduct = QProduct.product;
	QTrade qTrade = QTrade.trade;

    public List<ResCoupon> getCoupons(String coupon_owner){
    	List<Tuple> couponlist = jpaQueryFactory.select(qCoupon,qProduct.productImg).from(qCoupon)
				.join(qProduct).on(qCoupon.couponName.eq(qProduct.productName))
    			.where(qCoupon.couponOwner.eq(coupon_owner),qCoupon.couponIstrade.eq(0)).fetch();
		List<ResCoupon> resCouponList = new ArrayList<ResCoupon>();
    	for(Tuple t : couponlist){
			Coupon c = t.get(0,Coupon.class);
			String productImg = t.get(1,String.class);
			resCouponList.add(new ResCoupon(c,productImg));
		}
        return resCouponList;
    }
    
    public long deleteCoupons(String coupon_id) {
    	
    	return jpaQueryFactory.delete(qCoupon).where(qCoupon.couponId.eq(coupon_id)).execute();
    }

	public List<ResRequest> getRequestHistory(String id) {
		List<Tuple> tuples = jpaQueryFactory.select(qRequest,qProduct).from(qRequest)
				.join(qProduct).on(qProduct.productId.eq(qRequest.requestProductId))
				.where(qRequest.requestId.eq(id)).orderBy(qRequest.requestDate.desc()).fetch();
		ArrayList<ResRequest> requests = new ArrayList<ResRequest>();
		for(Tuple t : tuples){
			Request r = t.get(0,Request.class);
			Product p = t.get(1,Product.class);
			requests.add(new ResRequest(r,p));
		}
		return requests;
	}

	public List<HistoryTrade> getP2psellHistory(String id) {
		List<Tuple> tuples = jpaQueryFactory.select(qTrade,qCoupon).from(qTrade)
				.join(qCoupon).on(qCoupon.couponId.eq(qTrade.tradeCouponId))
				.where(qTrade.tradeRequestId.eq(id)).orderBy(qTrade.tradeDate.desc()).fetch();
		ArrayList<HistoryTrade> requests = new ArrayList<HistoryTrade>();
		for(Tuple t : tuples){
			Trade tr = t.get(0,Trade.class);
			Coupon c = t.get(1,Coupon.class);
			requests.add(new HistoryTrade(c,tr));
		}
		return requests;
	}

	public List<HistoryTrade> getP2pbuyHistory(String id) {
		List<Tuple> tuples = jpaQueryFactory.select(qTrade,qCoupon).from(qTrade)
				.join(qCoupon).on(qCoupon.couponId.eq(qTrade.tradeCouponId))
				.where(qTrade.tradeResponseId.eq(id)).orderBy(qTrade.tradeDate.desc()).fetch();
		ArrayList<HistoryTrade> requests = new ArrayList<HistoryTrade>();
		for(Tuple t : tuples){
			Trade tr = t.get(0,Trade.class);
			Coupon c = t.get(1,Coupon.class);
			requests.add(new HistoryTrade(c,tr));
		}
		return requests;
	}


}
