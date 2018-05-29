import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { CanReadGuard } from './can-read.guard';
import { AdminGuard } from './admin.guard';
import { SupplierGuard } from './supplier.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, CanReadGuard, AdminGuard, SupplierGuard]
})
export class CoreModule { }



