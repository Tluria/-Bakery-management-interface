import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CalEvent } from '../models/CalEvent';
import { CalendarService } from '../services/calendar.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CalendarResolve implements Resolve<CalEvent[]> {

    constructor(private service: CalendarService) {}

    resolve(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any[]>|Promise<any[]>|any{
        return new Promise((resolve, reject) => {
            this.service.getEvents().subscribe(data => {
                resolve(data);
            }, reject);
        });
    }
}
