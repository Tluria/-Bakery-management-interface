import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from
 'angularfire2/firestore';
 import { Component } from '@angular/core';
 import { Observable } from 'rxjs/Observable';
 import { CalendarEvent } from '../../app/models/CalendarEvent';

@Injectable()
export class CalendarService {
  public eventCollection: AngularFirestoreCollection<CalendarEvent>;
  public events: Observable<any[]>;

  constructor(public afs: AngularFirestore) {
    this.eventCollection = this.afs.collection('events');
    this.events = this.afs.collection('events').valueChanges();
   }

   getEvents(){
    return this.events;
  }

}