package com.ecommerce.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResTrade {

	private String couponId;
	private Date couponEnd;
	private String couponName;
	private String couponCategory;
	private String couponImg;
	private String couponExchange;

	private Integer tradeIdx;
	private String tradeRequestId;
	private String tradeResponseId;

	private Integer tradeMileage;
	private String tradeTitle;

	private String productImg;

	public ResTrade(Coupon coupon,Trade trade,String productImg){
		this.couponId = coupon.getCouponId();
		this.couponEnd = coupon.getCouponEnd();
		this.couponName = coupon.getCouponName();
		this.couponImg = coupon.getCouponImg();
		this.couponExchange = coupon.getCouponExchange();
		this.couponCategory = coupon.getCouponCategory();
		this.tradeIdx = trade.getTradeIdx();
		this.tradeRequestId = trade.getTradeRequestId();
		this.tradeResponseId = trade.getTradeResponseId();
		this.tradeMileage = trade.getTradeMileage();
		this.tradeTitle = trade.getTradeTitle();
		this.productImg = productImg;
	}
}
