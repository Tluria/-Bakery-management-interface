import { Component, OnInit } from '@angular/core';
import { WorkshopService } from '../services/workshop.service';
import {Workshop} from '../models/Workshop';

@Component({
  selector: 'app-add-workshop',
  templateUrl: './add-workshop.component.html',
  styleUrls: ['./add-workshop.component.css']
})
export class AddWorkshopComponent implements OnInit {
  workshop: Workshop = {
    name: '',
    date: '',
    duration: '',
    participants: null,
    price: null
  }

  constructor(private workshopService: WorkshopService) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.workshop.date != '' && this.workshop.duration != '' && this.workshop.name != ''
     && this.workshop.participants != null && this.workshop.price != null){
       this.workshopService.addWorkshop(this.workshop);
       this.workshop.name= '';
       this.workshop.date= '';
       this.workshop.duration= '';
       this.workshop.participants= null;
       this.workshop.price= null;
     }
  }
}
