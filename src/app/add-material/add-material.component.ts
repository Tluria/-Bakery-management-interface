import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';
import {Material} from '../models/Material';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
  material:Material = {
    name:'',
    quantity:null,
    critical:null
  }

  constructor(private materialService:MaterialService ) { }

  ngOnInit() {
  }

}
