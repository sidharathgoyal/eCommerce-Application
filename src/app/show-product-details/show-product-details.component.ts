import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ProductImagesDialogComponent } from '../product-images-dialog/product-images-dialog.component';
import { ImageProcessingServiceService } from '../_services/image-processing-service.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-product-details',
  standalone: false,
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit {

  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Actual Price', 'Discounted Price',
    'Actions'];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog, 
    private imageProcessingService: ImageProcessingServiceService,
    private router: Router){}

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

  deleteProduct(productId:any){
    this.productService.deleteProduct(productId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAllProducts();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  showImages(product: Product){
    console.log(product);
    this.imagesDialog.open(ProductImagesDialogComponent, {
      data:{
        images: product.productImages
      },      
      height: '500px',
      width: '800px'
    });
  }

  editProductDetails(productId:any){
    this.router.navigate(['/addNewProduct', {productId: productId} ]);
  }
}
