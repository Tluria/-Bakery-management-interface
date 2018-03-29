import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkshopComponent } from '../workshop/workshop.component';
import { WorkshopService } from '../services/workshop.service';
import {Workshop} from '../models/Workshop';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styleUrls: ['./edit-workshop.component.css']
})
export class EditWorkshopComponent implements OnInit {
  workshops:Workshop[];
  public num=null;
  editState: boolean = false;
  workshopToEdit: Workshop;

  constructor(private route: ActivatedRoute,private workshopService: WorkshopService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
     let id = params.get('id');
     console.log(id);
    })
    this.workshopService.getWorkshop().subscribe(workshops => {
      this.workshops = workshops;
    })
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
