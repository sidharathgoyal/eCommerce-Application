package com.git.demo.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
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
}
