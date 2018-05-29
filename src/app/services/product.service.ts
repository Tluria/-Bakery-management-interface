import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import { Observable } from 'rxjs/Rx'
import { Product } from '../models/Product';
import { contains } from '@firebase/util';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(public afs:AngularFirestore) {
    // this.products=this.afs.collection('product').valueChanges();

    this.productsCollection = this.afs.collection('product', ref => ref.orderBy('name','asc'));

    this.products= this.productsCollection.snapshotChanges().map( changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id= a.payload.doc.id;
        return data;
      });
    });   
   }

   addProduct(product: Product){
     this.productsCollection.add(product);
   }

   deleteProduct(product: Product){
     this.productDoc = this.afs.doc(`product/${product.id}`);
     this.productDoc.delete();

   }

   updateProduct(product: Product){
    this.productDoc = this.afs.doc(`product/${product.id}`);
    this.productDoc.update(product);
  }

  getAllEntries(): Observable<any> {
    return this.afs.collection('product').valueChanges();
  }

  getProducts() {
    return this.afs.collection('product', ref => ref.orderBy('name', 'asc'))
    .snapshotChanges()
    .pipe(map((data: any) => {
      return data.map(a => {
       const d = a.payload.doc.data() as Product;
       d.id = a.payload.doc.id;
       return d;
      })
    }));
  }
}


