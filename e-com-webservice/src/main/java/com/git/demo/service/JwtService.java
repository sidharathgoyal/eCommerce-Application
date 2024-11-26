package com.git.demo.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.git.demo.dao.UserDao;
import com.git.demo.entity.JwtRequest;
import com.git.demo.entity.JwtResponse;
import com.git.demo.entity.User;
import com.git.demo.util.JwtUtil;

@Service
public class JwtService implements UserDetailsService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private AuthenticationManager authManager;
	
	public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
		String userName = jwtRequest.getUserName();
		String password = jwtRequest.getUserPassword();
		authenticate(userName, password);
		
		final UserDetails userDetails = loadUserByUsername(userName);
		
		String newGeneratedToken = jwtUtil.generateToken(userDetails);
		
		User user = userDao.findById(userName).get();
		
		return new JwtResponse(user, newGeneratedToken);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userDao.findById(username).get();
		
		if(user != null) {
			return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), getAuthorities(user));
		}
		else {
			throw new UsernameNotFoundException("Username is not Valid!");
		}
	}
	
	private Set getAuthorities(User user) {
		Set authorities = new HashSet();
		user.getRole().forEach(role -> {
			authorities.add(new SimpleGrantedAuthority("ROLE_"+ role.getRoleName()));
		});
		
		return authorities;
	}
	
	private void authenticate(String userName, String userPassword) throws Exception{
		try {
			authManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
		}
		catch (DisabledException e) {
			throw new Exception("User is disabled!");
		}
		catch (BadCredentialsException e) {
			System.out.println("Bad credentials from user!");
		}
		
	}

}
