import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';
import { Material } from '../models/Material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
 
  isMeterialExist: boolean;
  material:Material = {
    name:'',
    quantity:null,
    critical:''
  }

  databaseMaterials: Material[] = [];

  constructor(private materialService:MaterialService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.materialService.getMaterials().subscribe(res => {
      this.databaseMaterials = res;
    })
  }

  onSubmit() {
    this.isMeterialExist = false;
    if(this.material.name != '' && this.material.quantity != null && this.material.critical != null){
      if(this.isExit()) {
        this.material.name='';
        this.showError();
      }
      else {
        this.materialService.addMaterial(this.material);
        this.material.name='';
        this.material.quantity=null;
        this.material.critical='';
        this.showSuccess();
      }
    }
  }

  showSuccess() {
    this.toastr.success('נוסף בהצלחה', 'Success!');
  }

  showError() {
    this.toastr.error('חומר גלם קיים במערכת', '');
  }

  isExit(): boolean {
    for(let m of this.databaseMaterials){
      if(m.name == this.material.name){
        this.isMeterialExist = true;
      }
    }
    if(this.isMeterialExist){
      return true;
    }
    else {
      return false;
    }
  }
}
