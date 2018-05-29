import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { MaterialService } from '../services/material.service';
import { Material } from '../models/Material';
import { DataSource } from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materials: Material[];
  copyMaterials: Material[]=[];
  editState:boolean = false;
  materialToEdit: Material;
  masg: string = '';
  currentFilter = 'all';
  isLoaded = false;
  showPencil: boolean = true;
  isAdmin: boolean;
 
  constructor(
    private materialService: MaterialService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef, 
    private route: ActivatedRoute,
    public auth: AuthService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if(user.roles.admin == 'כן'){
        this.isAdmin = true;
      }
    })
    this.materials = this.route.snapshot.data['materials'];
    this.copyMaterials = this.materials;
    this.showInfo();
  }

  onSearch(event) {
    const searchMaterials = this.materials.filter(material => {
      return material.name.includes(event.target.value);
    });

    if (event.target.value.length > 0) {
      this.materials = searchMaterials;
      return;
    }

    this.materials = this.copyMaterials;
  }

  deleteMaterial(event, material:Material){
    this.clearState();
    this.materialService.deleteMaterial(material);
    this.showError();
  }

  editMaterial(event, material:Material){
    this.showPencil = false;
    this.auth.user.subscribe(user => {
      if(user.roles.admin == 'כן'){
        this.editState = true;
        this.materialToEdit = material;
      }
      else {
        window.alert('Admins Only!!');
      }
    })
  }

  updateMaterial(material:Material){
    this.materialService.updateMaterial(material);
    this.clearState();
    this.showWarning();
  }

  clearState(){
    this.showPencil = true;
    this.editState = false;
    this.materialToEdit = null;
  }

  showError() {
    this.toastr.error('נמחק', '');
  }

  showWarning() {
    this.toastr.warning('עודכן', '');
  }

  showInfo() {
    this.toastr.info(this.userAlert(), null);
  }

  userAlert():string {
    var flag = true;
    this.masg = ' מלאי קריטי שעומד להיגמר : ';
    for (let m of this.materials){
      if(m.critical=='כן' && m.quantity<=2){
        this.masg += m.name + ', ';
        flag = false;
      }
    }
    if(flag){
      this.masg = 'אין חוסרים קריטיים במלאי';
      flag = true;
    }
    return this.masg;
  }

  filterBy(filter: string){
    switch(filter){
      case 'all':
        this.materials = this.copyMaterials;
        this.currentFilter = 'all';
        break;
      case 'critical':
        this.materials = this.materials.filter(material => {
          return material.critical.toLowerCase().includes('כן');
        });
        this.currentFilter = 'critical';
        break;
      case 'quantity':
        this.materials = this.materials.filter(material => {
          return (material.quantity) <= 2;
        });
        this.currentFilter = 'quantity';
        break;
    }
  }
}






 


