package com.git.demo.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.git.demo.entity.ImageModel;
import com.git.demo.entity.Product;
import com.git.demo.service.ProductService;

@RestController
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PreAuthorize("hasRole('Admin')")
	@PostMapping(value = {"/addNewProduct"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public Product addNewProduct(@RequestPart("product") Product product,
			@RequestPart("imageFile") MultipartFile[] file) {
		
		try {
			Set<ImageModel> images = uploadImage(file);
			product.setProductImages(images);
			return productService.addNewProduct(product);
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public Set<ImageModel> uploadImage(MultipartFile[] multiFiles) throws IOException {
		Set<ImageModel> imgModels = new HashSet<>();
		for(MultipartFile file: multiFiles) {
			ImageModel iModel = new ImageModel(
					file.getOriginalFilename(),
					file.getContentType(),
					file.getBytes()
			);
			imgModels.add(iModel);
		}
		return imgModels;
	}
	
	@GetMapping(value = {"/getAllProducts"})
	public List<Product> getAllProducts(){
		return productService.getAllProducts();
	}
	
	@GetMapping(value = {"/getProductDetailsById/{productId}"})
	public Product getProductDetailsById(@PathVariable("productId") Integer productId) {
		return productService.getProductDetailsById(productId);
	}
	
	@PreAuthorize("hasRole('Admin')")
	@DeleteMapping({"/deleteProductDetails/{productId}"})
	public void deleteProductDetails(@PathVariable("productId") Integer productId) {
		productService.deleteProductDetails(productId);
	}
	
	@PreAuthorize("hasRole('User')")
	@GetMapping({"/getProductDetails/{isSingleProductCheckout}/{productId}"})
	public List<Product> getProductDetails(@PathVariable(name = "isSingleProductCheckout") boolean isSingleProductCheckout, 
			@PathVariable(name = "productId") Integer productId) {
		
		return productService.getProductDetails(isSingleProductCheckout, productId);		
	}
}
