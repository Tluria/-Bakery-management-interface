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
  constructor(private route: ActivatedRoute,private workshopService: WorkshopService) { }

  ngOnInit() {
    this.workshopService.getWorkshop().subscribe(workshops => {
      this.workshops = workshops;
    })
  }
}
