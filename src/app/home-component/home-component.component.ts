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
  
  //Chart
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
    this.productService.getProducts().subscribe((result) => {
      this.processData(result);
    })
  }

  processData(entries) {

  }

}
