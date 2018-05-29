import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { WorkshopService } from '../services/workshop.service';
import {Workshop} from '../models/Workshop';
import {DataSource} from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {
  workshops:Workshop[];
  copyWorkshops:Workshop[]=[];
  public num=null;
  editState: boolean = false;
  workshopToEdit: Workshop;
  currentFilter = 'all';
  showPencil: boolean = true;
  isAdmin: boolean;

  constructor(private workshopService: WorkshopService, 
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
    this.workshops = this.route.snapshot.data['workshops'];
    this.copyWorkshops = this.workshops;
  }

  onSearch(event) {
    const searchWrokshops = this.workshops.filter(workshop => {
      return workshop.name.includes(event.target.value);
    });

    if (event.target.value.length > 0) {
      this.workshops = searchWrokshops;
      return;
    }

    this.workshops = this.copyWorkshops;
  }

  filterBy(filter: string){
    switch(filter){
      case 'all':
        this.workshops= this.copyWorkshops;
        this.currentFilter = 'all';
        break;
    }
  }

  editWorkshop(event, workshop: Workshop) {
    this.showPencil = false;
    this.auth.user.subscribe(user => {
      if(user.roles.admin == 'כן'){
        this.editState = true;
        this.workshopToEdit = workshop;
      }
      else {
        window.alert('Admins Only!!');
      }
    })
  }

  deleteWorkshop(event, workshop: Workshop){
    this.clearState();
    this.workshopService.deleteWorkshop(workshop);
    this.showError();
  }

  updateWorkshop(workshop: Workshop){
    this.workshopService.updateWorkshop(workshop);
    this.clearState();
    this.showWarning();
  }

  clearState(){
    this.showPencil = true;
    this.editState = false;
    this.workshopToEdit = null;
  }

  showError() {
    this.toastr.error('נמחק', '');
  }

  showWarning() {
    this.toastr.warning('עודכן', '');
  }
}
