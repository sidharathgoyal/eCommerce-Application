import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
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
    private productService: ProductService, private router: Router
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
        this.router.navigate(["/orderConfirm"]);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  getQuantityForProduct(productId: number){
    const filteredProduct =  this.orderDetails.quantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: number, productDiscPrice: number){
    const filteredProduct =  this.orderDetails.quantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscPrice;
  }

  onQuantityChanged(q: any, productId: number){
    this.orderDetails.quantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;
  }

  getTotalAmount(){
    let gTotal = 0;

    this.orderDetails.quantityList.forEach(
      (prodQty) => {
       const price =  this.productDetails.filter(product => product.productId === prodQty.productId)[0].prodDisPrice;
       gTotal = gTotal + price * prodQty.quantity;
      }
    );

    return gTotal;
  }
}
