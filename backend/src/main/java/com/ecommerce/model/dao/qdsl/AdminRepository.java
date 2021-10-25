package com.ecommerce.model.dao.qdsl;

import com.ecommerce.domain.*;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.ArrayList;

@Repository
public class AdminRepository {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	QRequest qRequest = QRequest.request;
	QProduct qProduct = QProduct.product;

	public ArrayList<ResRequest> getRequest() {
		List<Tuple> tuples = jpaQueryFactory.select(qRequest,qProduct).from(qRequest)
				.join(qProduct).on(qProduct.productId.eq(qRequest.requestProductId)).fetch();
		ArrayList<ResRequest> requests = new ArrayList<ResRequest>();
		for(Tuple t : tuples){
			Request r = t.get(0,Request.class);
			Product p = t.get(1,Product.class);
			requests.add(new ResRequest(r,p));
		}
		return requests;
	}

	public Request getOneRequest(String request_idx) {
		Request request = jpaQueryFactory.select(qRequest).from(qRequest)
				.where(qRequest.requestIdx.eq(Integer.parseInt(request_idx))).fetchOne();
		return request;
	}

}