package com.ecommerce.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Trade {

    @Id
    @Column(name="trade_idx")
    @GeneratedValue
    private Integer tradeIdx;

    //판매 유저 이메일
    @Column(name="trade_request_id")
    private String tradeRequestId;

    //구매 유저 이메일
    @Column(name="trade_response_id")
    private String tradeResponseId;

    @Column(name="trade_coupon_id")
    private String tradeCouponId;

    @Column(name="trade_status")
    private Integer tradeStatus;

    @Column(name="trade_mileage")
    private Integer tradeMileage;

    @Column(name="trade_title")
    private String tradeTitle;
    
    @Column(name="trade_date")
    private String tradeDate;

}
