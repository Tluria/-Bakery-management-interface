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
  copyWorkshops:Workshop[]=[];
  public num=null;
  editState: boolean = false;
  workshopToEdit: Workshop;
  currentFilter = 'all';

  constructor(private workshopService: WorkshopService) { }

  ngOnInit() {
    this.workshopService.getWorkshop().subscribe(workshops => {
      this.workshops = workshops;
      this.copyWorkshops= this.workshops;
    })
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
    this.editState = true;
    this.workshopToEdit = workshop;
  }

  deleteWorkshop(event, workshop: Workshop){
    this.clearState();
    this.workshopService.deleteWorkshop(workshop);
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
