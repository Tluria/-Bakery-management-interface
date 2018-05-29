import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { WorkshopService } from '../services/workshop.service';
import { Workshop } from '../models/Workshop';
import { MaterialService } from '../services/material.service';
import { Material } from '../models/Material';
import { CalendarService } from '../services/calendar.service';
import { CalEvent } from '../models/CalEvent';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  events: CalEvent[];
  workshops: Workshop[];
  products: Product[];
  materials: Material[];
  productData = [];
  workshopData = [];
  materialData = [];

  //Chart
  chartData: boolean = false;
  view: any[] = [550, 400];
  showLegend = true;

  colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', 'black','#55efc4',
               '#00b894', '#ffeaa7' , '#fdcb6e', '#2d3436', '#636e72', '#d63031', '#6c5ce7',
               '#00a8ff', '#0097e6', '#fbc531', '#e1b12c', '#7f8fa6', '#4cd137', '#273c75',
               '#273c75', '#192a56']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(private productService:ProductService ,
              private workshopService: WorkshopService,
              private materialService: MaterialService,
              private calService: CalendarService) { }

  ngOnInit() {
    this.productService.getAllEntries().subscribe((product) => {
      this.products = product;
      this.chartData = true;
      this.pData(product);
    })
    this.workshopService.getAllEntries().subscribe((workshop) => {
      this.workshops = workshop;
      this.chartData = true;
      this.wData(workshop);
    })
    this.materialService.getAllEntries().subscribe((material) => {
      this.materials = material;
      this.chartData = true;
      this.mData(material);
    })
    this.calService.getEvents().subscribe(events => {
      this.events = events;
    })
  }

  pData(entries) {
    this.productData = [];
    for(let p of this.products) {
      let productSingleentry = {
        name: p.name,
        value: p.quantity
      }
      this.productData.push(productSingleentry)
    }
  }

  wData(entries) {
    this.workshopData = [];
    for(let w of this.workshops) {
      let workshopSingleentry = {
        name: w.name,
        value: w.participants
      }
      this.workshopData.push(workshopSingleentry)
    }
  }

  mData(entries) {
    this.materialData = [];
    for(let m of this.materials) {
      let materialSingleentry = {
        name: m.name,
        value: m.quantity
      }
      this.materialData.push(materialSingleentry)
    }
  }
}
