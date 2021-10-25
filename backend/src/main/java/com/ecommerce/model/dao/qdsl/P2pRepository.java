package com.ecommerce.model.dao.qdsl;

import com.ecommerce.domain.*;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;
import java.util.Stack;

@Repository
public class P2pRepository {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	QCoupon qCoupon = QCoupon.coupon;
	QTrade qTrade = QTrade.trade;
	QProduct qProduct = QProduct.product;
	Stack<ResTrade> stack = new Stack<ResTrade>();

	public List<ResTrade> selectAll(){
;
		List<Tuple> l = jpaQueryFactory.select(qCoupon,qTrade).from(qCoupon).join(qTrade)
				.on(qCoupon.couponId.eq(qTrade.tradeCouponId)).where(qTrade.tradeStatus.eq(0))
				.orderBy().fetch();
		List<ResTrade> rl = new ArrayList<ResTrade>();

		for(Tuple t : l){
			Coupon c = t.get(0,Coupon.class);
			Trade tr = t.get(1,Trade.class);
			String productImg = jpaQueryFactory.select(qProduct.productImg).from(qProduct)
					.join(qCoupon).on(qProduct.productName.eq(qCoupon.couponName))
					.where(qCoupon.couponId.eq(c.getCouponId())).fetchFirst();
			stack.add(new ResTrade(c,tr,productImg));
			//rl.add(new ResTrade(c,tr,productImg));
		}
		while(!stack.isEmpty()){
			rl.add(stack.pop());
		}
		return rl;
	}

	public List<ResTrade> findAllByCouponCategory(String couponId){
		List<Tuple> l = jpaQueryFactory.select(qCoupon,qTrade).from(qCoupon).join(qTrade)
				.on(qCoupon.couponId.eq(qTrade.tradeCouponId))
				.where(qCoupon.couponCategory.eq(couponId),qTrade.tradeStatus.eq(0)).fetch();
		List<ResTrade> rl = new ArrayList<ResTrade>();
		for(Tuple t : l){
			Coupon c = t.get(0,Coupon.class);
			Trade tr = t.get(1,Trade.class);
			String productImg = jpaQueryFactory.select(qProduct.productImg).from(qProduct)
					.join(qCoupon).on(qProduct.productName.eq(qCoupon.couponName))
					.where(qCoupon.couponId.eq(c.getCouponId())).fetchFirst();
			stack.add(new ResTrade(c,tr,productImg));
		}
		while(!stack.isEmpty()){
			rl.add(stack.pop());
		}
		return rl;
	}

}