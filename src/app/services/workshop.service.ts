import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import { Observable } from 'rxjs/Observable';
import { Workshop } from '../models/Workshop';

@Injectable()
export class WorkshopService {
  workshopsCollection: AngularFirestoreCollection<Workshop>;
  workshops: Observable<Workshop[]>;

  constructor(public afs:AngularFirestore) {
    this.workshops = this.afs.collection('workshop').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Workshop;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getWorkshop(){
    return this.workshops;
  }

}
