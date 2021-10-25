package com.ecommerce.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Entity
public class Request {

    @Id
    @Column(name="request_idx")
    @GeneratedValue
    private Integer requestIdx;

    @Column(name="request_id")
    private String requestId;

    @Column(name="request_status")
    private String requestStatus;

    @Column(name="request_product_id")
    private Integer requestProductId;
    
    @Column(name="request_date")
    private String requestDate;
}
