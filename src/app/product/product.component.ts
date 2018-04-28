import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { DataSource } from '@angular/cdk/collections';

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
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products=products;
      this.copyProducts= this.products;
    })
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

}
