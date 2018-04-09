import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Product} from '../models/Product';
import { Material } from '../models/Material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product ={
    name:'',  
    price:null,
    quantity:null,
    type:'',
    kosher:'',
    material:[],
  }

  constructor(private productService:ProductService ) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.product.name !='' && this.product.price >=0 && this.product.quantity >=0
     && this.product.type !='' && this.product.kosher !='' && this.product.material !=null)
     this.productService.addProduct(this.product);
     this.product.name= '';
     this.product.price= 0;
     this.product.quantity=0;
     this.product.type= '';
     this.product.kosher= '';
     this.product.material= null;
  }

}
