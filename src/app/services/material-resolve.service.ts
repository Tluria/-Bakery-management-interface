import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Material } from '../models/Material';
import { MaterialService } from '../services/material.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MaterialResolve implements Resolve<Material[]> {

    constructor(private service: MaterialService) {}

    resolve(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any[]>|Promise<any[]>|any{
        return new Promise((resolve, reject) => {
            this.service.getMaterials().subscribe(data => {
                resolve(data);
            }, reject);
        });
    }
}
