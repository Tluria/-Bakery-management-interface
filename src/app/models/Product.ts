import { Material } from '../models/Material';

export interface Product{
    id?:string;
    name?:string;
    price?:number;
    quantity?:number;
    type?:string;
    kosher?:string;
    material?: Material[];
  }
