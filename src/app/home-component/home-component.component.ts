import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { WorkshopService } from '../services/workshop.service';
import { Workshop } from '../models/Workshop';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  workshops: Workshop[];
  products: Product[];
  productData = [];
  workshopData = [];

  //Chart
  chartData: boolean = false;
  view: any[] = [550, 400];
  showLegend = true;

  colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', 'black']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(private productService:ProductService ,private workshopService: WorkshopService) { }

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
}
