package com.git.demo.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.git.demo.entity.User;

@Repository
public interface UserDao extends CrudRepository<User, String>{

}
