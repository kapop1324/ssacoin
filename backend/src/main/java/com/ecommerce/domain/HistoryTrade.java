package com.ecommerce.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryTrade {

	private String couponId;
	private Date couponEnd;
	private String couponName;
	private String couponCategory;
	private String couponImg;
	private String couponExchange;

	private String tradeRequestId;
	private String tradeResponseId;
	private String tradeDate;
	private Integer tradeIdx;
	private Integer tradeStatus;

	private Integer tradeMileage;
	private String tradeTitle;

	public HistoryTrade(Coupon coupon, Trade trade){
		this.couponId = coupon.getCouponId();
		this.couponEnd = coupon.getCouponEnd();
		this.couponName = coupon.getCouponName();
		this.couponImg = coupon.getCouponImg();
		this.couponExchange = coupon.getCouponExchange();
		this.tradeRequestId = trade.getTradeRequestId();
		this.tradeResponseId = trade.getTradeResponseId();
		this.tradeStatus = trade.getTradeStatus();
		this.tradeMileage = trade.getTradeMileage();
		this.tradeTitle = trade.getTradeTitle();
		this.tradeDate = trade.getTradeDate();
		this.tradeIdx = trade.getTradeIdx();
	}
}
