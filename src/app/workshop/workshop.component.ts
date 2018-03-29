import { Component, OnInit } from '@angular/core';
import { WorkshopService } from '../services/workshop.service';
import {Workshop} from '../models/Workshop';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {
  workshops:Workshop[];
   public num=null;
   editState: boolean = false;
   workshopToEdit: Workshop;
  
    constructor(private workshopService: WorkshopService) { }
  
    ngOnInit() {
      this.workshopService.getWorkshop().subscribe(workshops => {
        this.workshops = workshops;
      })
    }

    horada(){
      for(var i=0;i<this.workshops.length;i++){
        
        this.workshops[i].price-=this.num;
      }
    }

    deleteWorkshop(event, workshop: Workshop){
      this.clearState();
      this.workshopService.deleteWorkshop(workshop);
    }

    editWorkshop(event, workshop: Workshop) {
      this.editState = true;
      this.workshopToEdit = workshop;
    }

    updateWorkshop(workshop: Workshop){
      this.workshopService.updateWorkshop(workshop);
      this.clearState();
    }

    clearState(){
      this.editState = false;
      this.workshopToEdit = null;
    }

}
