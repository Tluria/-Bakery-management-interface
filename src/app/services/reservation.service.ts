import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Reservation } from '../models/Reservation';
import { map } from 'rxjs/operators';

@Injectable()
export class ReservationService {

  reservationCollection: AngularFirestoreCollection<Reservation>;
  reservations: Observable<Reservation[]>;
  ReservationDoc: AngularFirestoreDocument<Reservation>;

  constructor(public afs:AngularFirestore ) {
    // this.reservations = this.afs.collection('reservation').valueChanges();
 
    this.reservationCollection=this.afs.collection('reservation', ref => ref.orderBy('description', 'asc'));
    this.reservations = this.reservationCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Reservation;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

  getReservations() {
    return this.afs.collection('reservation', ref => ref.orderBy('date', 'asc'))
    .snapshotChanges()
    .pipe(map((data: any) => {
      return data.map(a => {
       const d = a.payload.doc.data() as Reservation;
       d.id = a.payload.doc.id;
       return d;
      })
    }));
  }

  addReservation(reservation: Reservation){
   this.reservationCollection.add(reservation);
  }

  deleteReservation(reservation: Reservation){
   this.ReservationDoc = this.afs.doc(`reservation/${reservation.id}`);
   this.ReservationDoc.delete();
  }

  updateReservation(reservation: Reservation){
   this.ReservationDoc = this.afs.doc(`reservation/${reservation.id}`);
   this.ReservationDoc.update(reservation);
  }

  updateResStatus1(reservation: Reservation) {
    this.ReservationDoc = this.afs.doc(`reservation/${reservation.id}`);
    this.ReservationDoc.set({
      status: 'בטיפול'
    }, { merge: true });
  }

  updateResStatus2(reservation: Reservation) {
    this.ReservationDoc = this.afs.doc(`reservation/${reservation.id}`);
    this.ReservationDoc.set({
      status: 'הזמנה נשלחה'
    }, { merge: true });
  }

  updateResStatus3(reservation: Reservation) {
    this.ReservationDoc = this.afs.doc(`reservation/${reservation.id}`);
    this.ReservationDoc.set({
      status: 'הזמנה חסרה במלאי'
    }, { merge: true });
  }
}