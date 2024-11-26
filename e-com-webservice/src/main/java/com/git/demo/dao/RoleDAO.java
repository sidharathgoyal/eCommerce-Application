package com.git.demo.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.git.demo.entity.Role;

@Repository
public interface RoleDAO extends CrudRepository<Role, String> {

}
