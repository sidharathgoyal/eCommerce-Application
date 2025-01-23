package com.git.demo.entity;

import java.util.List;

public class OrderInput {

	private String userFullName;
	private String userFullAdd;
	private String userContNumber;
	private String userAltContNumber;
	private List<OrderProductQuantity> quantityList;
	public String getUserFullName() {
		return userFullName;
	}
	public void setUserFullName(String userFullName) {
		this.userFullName = userFullName;
	}
	public String getUserFullAdd() {
		return userFullAdd;
	}
	public void setUserFullAdd(String userFullAdd) {
		this.userFullAdd = userFullAdd;
	}
	public String getUserContNumber() {
		return userContNumber;
	}
	public void setUserContNumber(String userContNumber) {
		this.userContNumber = userContNumber;
	}
	public String getUserAltContNumber() {
		return userAltContNumber;
	}
	public void setUserAltContNumber(String userAltContNumber) {
		this.userAltContNumber = userAltContNumber;
	}
	public List<OrderProductQuantity> getQuantityList() {
		return quantityList;
	}
	public void setQuantityList(List<OrderProductQuantity> quantityList) {
		this.quantityList = quantityList;
	}
	
	
}
