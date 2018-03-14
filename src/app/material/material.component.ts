import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';
import {Material} from '../models/Material';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materials:Material[];

  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.materialService.getMaterials().subscribe(materials => {
      this.materials = materials;
    })
  }
}



 


