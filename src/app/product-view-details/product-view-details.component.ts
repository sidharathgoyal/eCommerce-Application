import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-view-details',
  standalone: false,
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})
export class ProductViewDetailsComponent implements OnInit {

  selectProdIndex = 0;
  product!: Product;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const resolvedData = this.activatedRoute.snapshot.data['product'];
    if (resolvedData) {
      this.product = resolvedData;
    }
    else {
      console.error('No product data found in route resolver.');
    }
    console.log(this.product);
  }

  changeIndex(index: any) {
    // this.selectProdIndex = index;
    if (this.product?.productImages && index < this.product.productImages.length) {
      this.selectProdIndex = index;
    } else {
      console.warn('Invalid index:', index);
    }
  }

  buyProduct(productId: number) {
    if (productId) {
      this.router.navigate(['/buyProduct'], {
        queryParams: {
          id: productId,
          isSingleProductCheckout: true
        }
      });
    } else {
      console.error('Product ID is not valid.');
    }
  }
}
