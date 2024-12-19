package com.git.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.git.demo.dao.ProductDao;
import com.git.demo.entity.Product;

@Service
public class ProductService {

	@Autowired
	private ProductDao productDao;
	
	public Product addNewProduct(Product product) {
		return productDao.save(product);
	}
}
