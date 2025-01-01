import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from './product.service';
import { ImageProcessingServiceService } from './image-processing-service.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingServiceService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Product> {
    const id = route.paramMap.get("productId");

    if(id != null){
      const pId = parseInt(id);
      return this.productService.getProductDetailsById(pId).pipe(
        map(p => this.imageProcessingService.createImages(p) )
      );
    }
    else{
      return this.getProductDetails();
    }
  }

  getProductDetails(){
    return {
      productId: null,
      productName: "",
    productDesc: "",
    prodActPrice: 0,
    prodDisPrice: 0,
    productImages: []
    };
  }
}
