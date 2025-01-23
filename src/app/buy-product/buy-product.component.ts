import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buy-product',
  standalone: false,
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit{

  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    userFullName: '',
    userFullAdd: '',
    userContNumber: '',
    userAltContNumber: '',
    quantityList: []
  }

  constructor(private route: ActivatedRoute,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.productDetails = this.route.snapshot.data['productDetails'];
    
    this.productDetails.forEach(
      x => this.orderDetails.quantityList.push(
        {productId: x.productId, quantity: 1}
      )
    );

    console.log(this.productDetails);
    console.log(this.orderDetails);

  }

  public placeOrder(orderForm: NgForm){
    this.productService.placeOrder(this.orderDetails).subscribe({
      next: (response) => {
        console.log(response);
        orderForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

}
