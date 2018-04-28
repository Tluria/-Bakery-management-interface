import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';
import {Material} from '../models/Material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
  material:Material = {
    name:'',
    quantity:null,
    critical:''
  }

  constructor(private materialService:MaterialService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.material.name != '' && this.material.quantity != null && this.material.critical != null){
      this.materialService.addMaterial(this.material);
      this.material.name='';
      this.material.quantity=null;
      this.material.critical='';
      this.showSuccess();
    }
  }

  showSuccess() {
    this.toastr.success('נוסף בהצלחה', 'Success!');
  }

  showError() {
    this.toastr.error('נמחק', '');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

}
