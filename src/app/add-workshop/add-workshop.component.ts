import { Component, OnInit } from '@angular/core';
import { WorkshopService } from '../services/workshop.service';
import { Workshop } from '../models/Workshop';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-add-workshop',
  templateUrl: './add-workshop.component.html',
  styleUrls: ['./add-workshop.component.css']
})
export class AddWorkshopComponent implements OnInit {

  isWorkshopExist: boolean;
  workshop: Workshop = {
    name: '',
    date: '',
    duration: '',
    participants: null,
    price: null
  }
  databaseWorkshops: Workshop[] = [];

  constructor(private workshopService: WorkshopService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.workshopService.getWorkshop().subscribe(res => {
      this.databaseWorkshops = res;
    })
  }

  onSubmit() {
    this.isWorkshopExist = false;
    if(this.workshop.date != '' && this.workshop.duration != '' && this.workshop.name != ''
     && this.workshop.participants != null && this.workshop.price != null) {
      if(this.isExit()) {
        this.workshop.name='';
        this.showError();
      }
      else {
       this.workshopService.addWorkshop(this.workshop);
       this.workshop.name= '';
       this.workshop.date= '';
       this.workshop.duration= '';
       this.workshop.participants= null;
       this.workshop.price= null;
       this.showSuccess();
      }
     }
  }

  showSuccess() {
    this.toastr.success('נוסף בהצלחה', 'Success!');
  }
 
  showError() {
    this.toastr.error('סדנא קיימת במערכת', '');
  }

  isExit(): boolean {
    for(let m of this.databaseWorkshops){
      if(m.name == this.workshop.name){
        this.isWorkshopExist = true;
      }
    }
    if(this.isWorkshopExist){
      return true;
    }
    else {
      return false;
    }
  }
}
