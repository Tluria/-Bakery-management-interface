import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Workshop } from '../models/Workshop';
import { WorkshopService } from '../services/workshop.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkshopResolve implements Resolve<Workshop[]> {

    constructor(private service: WorkshopService) {}

    resolve(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any[]>|Promise<any[]>|any{
        return new Promise((resolve, reject) => {
            this.service.getWorkshop().subscribe(data => {
                resolve(data);
            }, reject);
        });
    }
}
