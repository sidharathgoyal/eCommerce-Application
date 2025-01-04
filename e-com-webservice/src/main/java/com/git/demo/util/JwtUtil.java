package com.git.demo.util;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

	private static final String secretKey = "IamLittleDisappointedWithThisShitHopeThisIsTheLastTimenewExperienceWithFuckingJwtSecurityAndItIsReallyPissingMeOFF";
	
	private static final int TOKEN_VALIDITY = 3600*5;
	
	public String getUserNameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}
	
	private <T> T getClaimFromToken(String token, Function<Claims, T> claimResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimResolver.apply(claims);
	}
	
	private Claims getAllClaimsFromToken(String token) {
		byte[] secretBytes = Base64.getDecoder().decode(secretKey);
		Key key = new SecretKeySpec(secretBytes, 0, secretBytes.length, "HmacSHA256");
		
		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
	}
	
	public boolean validateToken(String token, UserDetails userDetails) {
		String userName = getUserNameFromToken(token);
		return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	private boolean isTokenExpired(String token) {
		final Date expirationDate= getExpirationDateFromToken(token);
		return expirationDate.before(new Date());
	}
	
	private Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}
	
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		
		byte[] secretBytes = Base64.getDecoder().decode(secretKey); 
	    Key signingKey = new SecretKeySpec(secretBytes, 0, secretBytes.length, "HmacSHA256");
	    
		return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername()).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
				.signWith(signingKey, SignatureAlgorithm.HS512).compact();
				
	}
}
