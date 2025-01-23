package com.git.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.git.demo.configuration.JwtRequestFilter;
import com.git.demo.dao.OrderDetailDao;
import com.git.demo.dao.ProductDao;
import com.git.demo.dao.UserDao;
import com.git.demo.entity.OrderDetail;
import com.git.demo.entity.OrderInput;
import com.git.demo.entity.OrderProductQuantity;
import com.git.demo.entity.Product;
import com.git.demo.entity.User;

@Service
public class OrderDetailService {

	private static final String ORDER_PLACED = "PLACED";
	
	@Autowired
	public OrderDetailDao orderDetailDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserDao userDao;
	
	public void placeOrder(OrderInput orderInput) {
		List<OrderProductQuantity> quantityList = orderInput.getQuantityList();
		
		for(OrderProductQuantity o: quantityList) {
			Product product = productDao.findById(o.getProductId()).get();
			
			String currentUser = JwtRequestFilter.CURRENT_USER;
			User user = userDao.findById(currentUser).get();
			
			OrderDetail orderDetail = new OrderDetail(orderInput.getUserFullName(),
					orderInput.getUserFullAdd(), orderInput.getUserContNumber(), orderInput.getUserAltContNumber(),
					ORDER_PLACED, product.getProdDisPrice()*o.getQuantity(), product, user);
			
			orderDetailDao.save(orderDetail);
		}
	}
	
}
