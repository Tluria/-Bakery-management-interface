import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductResolve implements Resolve<Product[]> {

    constructor(private service: ProductService) {}

    resolve(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any[]>|Promise<any[]>|any{
        return new Promise((resolve, reject) => {
            this.service.getProducts().subscribe(data => {
                resolve(data);
            }, reject);
        });
    }
}
