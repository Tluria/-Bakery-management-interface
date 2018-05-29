import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
      return this.auth.user.pipe(
        take(1),
        map(user => user && user.roles.admin == 'כן' ? true : false),
        tap(isAdmin => {
          if (!isAdmin) {
            window.alert('Access denied - Admins only');
          }
        })
      );
  }
}
