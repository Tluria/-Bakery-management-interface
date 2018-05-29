import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Reservation } from '../models/Reservation';
import { ReservationService } from '../services/reservation.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReservationResolve implements Resolve<Reservation[]> {

    constructor(private service: ReservationService) {}

    resolve(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any[]>|Promise<any[]>|any{
        return new Promise((resolve, reject) => {
            this.service.getReservations().subscribe(data => {
                resolve(data);
            }, reject);
        });
    }
}