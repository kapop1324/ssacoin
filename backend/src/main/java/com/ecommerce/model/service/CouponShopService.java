package com.ecommerce.model.service;

import com.ecommerce.domain.Product;
import com.ecommerce.domain.Request;
import com.ecommerce.model.dao.IProductRepository;
import com.ecommerce.model.dao.IRequestRepository;
import com.ecommerce.model.dao.ITradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class CouponShopService implements ICouponShopService {

    @Autowired
    IProductRepository productRepository;
    @Autowired
    ITradeRepository tradeRepository;
    @Autowired
    IRequestRepository requestRepository;

    @Override
    public List<Product> selectAll() {
        return productRepository.findAll();
    }
    
	@Override
	public Product SelectOne(int couponId) {
		return productRepository.findByProductId(couponId);
	}

    @Override
    public List<Product> selectByCategory(String category) {
        return productRepository.findAllByProductCategory(category);
    }

    @Override
    public boolean buy(Request request) {
    	Date time  = new Date();
    	SimpleDateFormat date = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    	request.setRequestDate(date.format(time));
        Request req = requestRepository.save(request);
        if(req == null) return false;
        return true;
    }


}
