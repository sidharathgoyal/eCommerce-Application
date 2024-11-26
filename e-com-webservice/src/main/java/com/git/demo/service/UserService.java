package com.git.demo.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.git.demo.dao.RoleDAO;
import com.git.demo.dao.UserDao;
import com.git.demo.entity.Role;
import com.git.demo.entity.User;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private RoleDAO roleDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User registerNewUser(User user) {
		Role role = roleDao.findById("User").get();
		Set<Role> roles = new HashSet<>();
		roles.add(role);
		user.setRole(roles);
		
		user.setPassword(getEncodedPassword(user.getPassword()));
		return userDao.save(user);
	}
	
	public void initRolesAndUser() {
		
		Role adminRole = new Role();
		adminRole.setRoleName("Admin");
		adminRole.setRoleDesc("Admin role");
		roleDao.save(adminRole);
		
		Role userRole = new Role();
		userRole.setRoleName("User");
		userRole.setRoleDesc("Default role for newly created user");
		roleDao.save(userRole);
		
		User adminUser = new User();
		adminUser.setFirstName("admin");
		adminUser.setLastName("admin");
		adminUser.setUserName("admin123");
		adminUser.setPassword(getEncodedPassword("admin@pass"));
		Set<Role> adminRoles = new HashSet<>();
		adminRoles.add(adminRole);
		adminUser.setRole(adminRoles);
		userDao.save(adminUser);
		
//		User user = new User();
//		user.setFirstName("Sid");
//		user.setLastName("Goyal");
//		user.setUserName("sid25");
//		user.setPassword(getEncodedPassword("sid@user"));
//		Set<Role> userRoles = new HashSet<>();
//		userRoles.add(userRole);
//		user.setRole(userRoles);
//		userDao.save(user);
	}
	
	public String getEncodedPassword(String password) {
		return passwordEncoder.encode(password);
	}
}
