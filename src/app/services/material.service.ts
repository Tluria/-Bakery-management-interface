import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import { Observable } from 'rxjs/Observable';
import { Material } from '../models/Material';
import { map } from 'rxjs/operators';

@Injectable()
export class MaterialService {
  materialsCollection: AngularFirestoreCollection<Material>;
  materials: Observable<Material[]>;  
  materialDoc: AngularFirestoreDocument<Material>;
  
  constructor(public afs:AngularFirestore ) {
   // this.materials = this.afs.collection('material').valueChanges();

   this.materialsCollection = this.afs.collection('material', ref => ref.orderBy('name', 'asc'));
   this.materials = this.materialsCollection.snapshotChanges().map(changes => {
     return changes.map(a => {
       const data = a.payload.doc.data() as Material;
       data.id = a.payload.doc.id;
       return data;
     });
   });
  }

   addMaterial(material: Material){
    this.materialsCollection.add(material); 
   }

   deleteMaterial(material: Material){
    this.materialDoc = this.afs.doc(`material/${material.id}`);
    this.materialDoc.delete();
   }

   updateMaterial(material: Material){
    this.materialDoc = this.afs.doc(`material/${material.id}`);
    this.materialDoc.update(material);
   }

   getAllEntries(): Observable<any> {
    return this.afs.collection('material').valueChanges();
  }

   getMaterials() {
     return this.afs.collection('material', ref => ref.orderBy('name', 'asc'))
     .snapshotChanges()
     .pipe(map((data: any) => {
       return data.map(a => {
        const d = a.payload.doc.data() as Material;
        d.id = a.payload.doc.id;
        return d;
       })
     }));
   }
}

