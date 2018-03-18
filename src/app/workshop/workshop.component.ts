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
  
    constructor(private workshopService: WorkshopService) { }
  
    ngOnInit() {
      this.workshopService.getWorkshop().subscribe(workshops => {
        this.workshops = workshops;
      })
    }
}
