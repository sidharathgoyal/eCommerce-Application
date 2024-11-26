package com.git.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.git.demo.dao.RoleDAO;
import com.git.demo.entity.Role;

@Service
public class RoleService {

	@Autowired
	private RoleDAO roleDao;
	
	public Role createNewRole(Role role) {
		return roleDao.save(role);
	}
}
