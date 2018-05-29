import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class SupplierGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
      return this.auth.user.pipe(
        take(1),
        map(user => user && user.roles.supplier == 'כן'  ? true : false),
        tap(isSupplier => {
          if (!isSupplier) {
            window.alert('Access denied - Supplier only');
          }
        })
      );
  }
}
