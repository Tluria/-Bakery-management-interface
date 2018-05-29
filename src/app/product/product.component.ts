import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { DataSource } from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  copyProducts:Product[]=[];
  editState: boolean= false;
  productToEdit: Product;
  currentFilter = 'all';
  showPencil: boolean = true;
  isAdmin: boolean;
  
  constructor(private productService: ProductService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private route: ActivatedRoute,
              public auth: AuthService) { 
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if(user.roles.admin == 'כן'){
        this.isAdmin = true;
      }
    })
    this.products = this.route.snapshot.data['products'];
    this.copyProducts = this.products;
  }

  onSearch(event) {
    const searchProducts = this.products.filter(product => {
      return product.name.includes(event.target.value);
    });

    if (event.target.value.length > 0) {
      this.products = searchProducts;
      return;
    }

    this.products = this.copyProducts;
  }

  updateProduct(product: Product){
    this.productService.updateProduct(product);
    this.clearState();
    this.showWarning();
  }

  deleteProduct(event, product: Product ){
    this.clearState();
    this.productService.deleteProduct(product);
    this.showError();
  }

  editProduct(event, product: Product){
    this.showPencil = false;
    this.auth.user.subscribe(user => {
      if(user.roles.admin == 'כן'){
        this.editState= true;
        this.productToEdit= product;
      }
      else {
        window.alert('Admins Only!!');
      }
    })
  }

  clearState(){
    this.showPencil = true;
    this.editState = false;
    this.productToEdit = null;
  }

  filterBy(filter: string){
    switch(filter){
      case 'all':
        this.products= this.copyProducts;
        this.currentFilter = 'all';
        break;
      case 'kosher':
          this.products= this.products.filter(product => {
          return product.kosher.toLowerCase().includes('פרווה');
        });
        this.currentFilter = 'kosher';
        break;
      case 'milk':
          this.products= this.products.filter(product => {
          return product.kosher.toLowerCase().includes('חלבי');
        });
        this.currentFilter = 'milk';
        break;
    }
  }

  showError() {
    this.toastr.error('נמחק', '');
  }

  showWarning() {
    this.toastr.warning('עודכן', '');
  }
}
