import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  products: Product[];
  productData = [];

  //Chart
  chartData: boolean = false;
  view: any[] = [700, 400];
  showLegend = true;

  colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productService.getAllEntries().subscribe((result) => {
      this.products = result;
      this.chartData = true;
      this.processData(result);
    })
  }

  processData(entries) {
    this.productData =[];
    for(let key of this.products) {
      let singleentry = {
        name: key.name,
        value: key.quantity
      }
      this.productData.push(singleentry)
    }
  }

}
