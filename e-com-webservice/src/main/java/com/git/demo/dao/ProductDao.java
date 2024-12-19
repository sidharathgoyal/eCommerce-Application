package com.git.demo.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.git.demo.entity.Product;

@Repository
public interface ProductDao extends CrudRepository<Product, Integer>{

}
