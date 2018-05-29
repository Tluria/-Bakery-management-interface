import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../core/user';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserResolve implements Resolve<User[]> {

    constructor(private service: UserService) {}

    resolve(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any[]>|Promise<any[]>|any{
        return new Promise((resolve, reject) => {
            this.service.getUsers().subscribe(data => {
                resolve(data);
            }, reject);
        });
    }
}