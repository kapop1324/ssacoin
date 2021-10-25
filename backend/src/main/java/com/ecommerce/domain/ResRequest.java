package com.ecommerce.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
public class ResRequest {


    private Integer requestIdx;

    private String requestId;

    private String requestStatus;

    private Integer requestProductId;

    private String requestDate;

    private String requestProductName;

    private Integer requestMileage;

    public ResRequest(Request request,Product product){
        this.requestIdx = request.getRequestIdx();
        this.requestId = request.getRequestId();
        this.requestStatus = request.getRequestStatus();
        this.requestProductId = request.getRequestProductId();
        this.requestDate = request.getRequestDate();
        this.requestProductName = product.getProductName();
        this.requestMileage = product.getProductMileage();
    }
}
