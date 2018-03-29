import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import { Observable } from 'rxjs/Observable';
import { Workshop } from '../models/Workshop';

@Injectable()
export class WorkshopService {
  workshopsCollection: AngularFirestoreCollection<Workshop>;
  workshops: Observable<Workshop[]>;
  workshopDoc: AngularFirestoreDocument<Workshop>;

  constructor(public afs:AngularFirestore) {
    this.workshopsCollection = this.afs.collection('workshop', ref => ref.orderBy('date','asc'));
    this.workshops = this.workshopsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Workshop;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getWorkshop() {
    return this.workshops;
  }

  addWorkshop(workshop: Workshop) {
    this.workshopsCollection.add(workshop);
  }

  deleteWorkshop(workshop: Workshop){
    this.workshopDoc = this.afs.doc(`workshop/${workshop.id}`);
    this.workshopDoc.delete();
  }

  updateWorkshop(workshop: Workshop){
    this.workshopDoc = this.afs.doc(`workshop/${workshop.id}`);
    this.workshopDoc.update(workshop);
  }

}
