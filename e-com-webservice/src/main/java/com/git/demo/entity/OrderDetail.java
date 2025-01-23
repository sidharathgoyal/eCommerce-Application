package com.git.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer orderId;
	private String custFullName;
	private String custFullAddress;
	private String custContNumber;
	private String custAltContNumber;
	private String orderStatus;
	private Double orderAmount;
	@ManyToOne
	private Product product;
	@ManyToOne
	private User user;
	
	
	public OrderDetail(String custFullName, String custFullAddress, String custContNumber, String custAltContNumber,
			String orderStatus, Double orderAmount, Product product, User user) {
		this.custFullName = custFullName;
		this.custFullAddress = custFullAddress;
		this.custContNumber = custContNumber;
		this.custAltContNumber = custAltContNumber;
		this.orderStatus = orderStatus;
		this.orderAmount = orderAmount;
		this.product = product;
		this.user = user;
	}
	
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Integer getOrderId() {
		return orderId;
	}
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}
	public String getCustFullName() {
		return custFullName;
	}
	public void setCustFullName(String custFullName) {
		this.custFullName = custFullName;
	}
	public String getCustFullAddress() {
		return custFullAddress;
	}
	public void setCustFullAddress(String custFullAddress) {
		this.custFullAddress = custFullAddress;
	}
	public String getCustContNumber() {
		return custContNumber;
	}
	public void setCustContNumber(String custContNumber) {
		this.custContNumber = custContNumber;
	}
	public String getCustAltContNumber() {
		return custAltContNumber;
	}
	public void setCustAltContNumber(String custAltContNumber) {
		this.custAltContNumber = custAltContNumber;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public Double getOrderAmount() {
		return orderAmount;
	}
	public void setOrderAmount(Double orderAmount) {
		this.orderAmount = orderAmount;
	}
	
	
}
