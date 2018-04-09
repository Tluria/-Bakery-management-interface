import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Product} from '../models/Product';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  editState: boolean= false;
  productToEdit: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products=products;
    })
  }

  updateProduct(product: Product){
    this.productService.updateProduct(product);
    this.clearState();
  }

  deleteProduct(event, product: Product ){
    this.clearState();
    this.productService.deleteProduct(product);
  }

  editProduct(event, product: Product){
    this.editState= true;
    this.productToEdit= product;
  }

  clearState(){
    this.editState = false;
    this.productToEdit = null;
  }
}
