import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from './product.service';
import { ImageProcessingServiceService } from './image-processing-service.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingServiceService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Product[]> {

    const fetchId = route.queryParamMap.get('id');
    if (!fetchId) {
      console.error('Missing query parameter: id');
      throw new Error("Product ID is required.");
    }
    const pId = parseInt(fetchId);
    const isSingleProductCheckout = route.queryParamMap.get("isSingleProductCheckout") === 'true';
    
    return this.productService.getProductDetails(isSingleProductCheckout, pId).pipe(
      map(
        (x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))
      )
    );
  }
}
