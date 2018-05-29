import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Reservation } from '../models/Reservation';
import { map } from 'rxjs/operators';

@Injectable()
export class UpdateReservationsService {

  index;

  constructor() { }

}
