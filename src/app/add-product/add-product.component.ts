import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { Material } from '../models/Material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  isProductExist: boolean;
  product: Product ={
    name:'',  
    price:null,
    quantity:null,
    type:'',
    kosher:'',
    material:[],
  }
  databaseProducts: Product[] = [];

  constructor(private productService:ProductService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.databaseProducts = res;
    })
  }

  onSubmit(){
    this.isProductExist = false;
    if(this.product.name !='' && this.product.price >=0 && this.product.quantity >=0
     && this.product.type !='' && this.product.kosher !='' && this.product.material !=null){
      if(this.isExit()) {
        this.product.name='';
        this.showError();
      }
      else {
        this.productService.addProduct(this.product);
        this.product.name= '';
        this.product.price= 0;
        this.product.quantity=0;
        this.product.type= '';
        this.product.kosher= '';
        this.product.material= null;
        this.showSuccess();
      }  
    }
    else {
      this.showWarning();
    }
  }

  showSuccess() {
    this.toastr.success('נוסף בהצלחה', 'Success!');
  }

  showError() {
    this.toastr.error('מוצר קיים במערכת', '');
  }

  showWarning() {
    this.toastr.warning('חייב למלא את כל השדות', '');
  }

  isExit(): boolean {
    for(let m of this.databaseProducts){
      if(m.name == this.product.name){
        this.isProductExist = true;
      }
    }
    if(this.isProductExist){
      return true;
    }
    else {
      return false;
    }
  }
}
