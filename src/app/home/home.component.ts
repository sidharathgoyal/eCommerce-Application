import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingServiceService } from '../_services/image-processing-service.service';
import { map } from 'rxjs/operators';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  productDetails: Product[] = [];

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
      this.productService.gettAllProducts()
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe({
        next: (response: Product[]) => {
          console.log(response);
          this.productDetails = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
    }

    public showProductDetails(productId: any){
      this.router.navigate(['/productViewDetails', {productId: productId}])
    }
}
