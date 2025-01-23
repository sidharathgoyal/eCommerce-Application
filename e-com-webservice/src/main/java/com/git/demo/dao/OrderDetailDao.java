package com.git.demo.dao;

import org.springframework.data.repository.CrudRepository;

import com.git.demo.entity.OrderDetail;

public interface OrderDetailDao extends CrudRepository<OrderDetail, Integer>{

}
