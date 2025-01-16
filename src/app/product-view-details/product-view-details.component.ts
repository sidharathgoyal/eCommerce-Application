import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view-details',
  standalone: false,
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})
export class ProductViewDetailsComponent implements OnInit {

  selectProdIndex =0;
  product!: Product;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void { 
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
   }

   changeIndex(index:any){
    this.selectProdIndex = index;
   }
}
