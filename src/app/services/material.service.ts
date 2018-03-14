import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import { Observable } from 'rxjs/Observable';
import { Material } from '../models/Material';

@Injectable()
export class MaterialService {
  materialsCollection: AngularFirestoreCollection<Material>;
  materials: Observable<Material[]>;

  constructor(public afs:AngularFirestore ) {
   // this.materials = this.afs.collection('material').valueChanges();
   this.materials = this.afs.collection('material').snapshotChanges().map(changes => {
     return changes.map(a => {
       const data = a.payload.doc.data() as Material;
       data.id = a.payload.doc.id;
       return data;
     });
   });
  }

   getMaterials(){
     return this.materials;
   }

}

