import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from
 'angularfire2/firestore';
 import { Component } from '@angular/core';
 import { Observable } from 'rxjs/Observable';
 import { CalEvent } from '../../app/models/CalEvent';
 import { map } from 'rxjs/operators';


@Injectable()
export class CalendarService {
  public eventCollection: AngularFirestoreCollection<CalEvent>;
  public events: Observable<any[]>;
  eventDoc: AngularFirestoreDocument<CalEvent>;
  
  constructor(public afs: AngularFirestore) {
    this.eventCollection = this.afs.collection('events', ref => ref.orderBy('title', 'asc'));
    this.events = this.eventCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as CalEvent;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

  //  getEvents(){
  //   return this.events;
  // }

  addEvent(event: CalEvent) {
    this.eventCollection.add(event); 
  }

  deleteEvent(event: CalEvent) {
    this.eventDoc = this.afs.doc(`events/${event.id}`);
    this.eventDoc.delete();
   }

   updateEvent(event: CalEvent) {
    this.eventDoc = this.afs.doc(`events/${event.id}`);
    this.eventDoc.set({
      title: event.title,
      start: event.start,
      end: event.end
    })
   }

   getEvents() {
    return this.afs.collection('events', ref => ref.orderBy('start', 'asc'))
    .snapshotChanges()
    .pipe(map((data: any) => {
      return data.map(a => {
       const d = a.payload.doc.data() as CalEvent;
       d.id = a.payload.doc.id;
       return d;
      })
    }));
  }
}