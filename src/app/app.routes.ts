import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { MaterialResolve } from './services/material-resolve.service';
import { ProductResolve } from './services/product-resolve.service';
import { ReservationResolve } from './services/reservation-resolve.service';
import { WorkshopResolve } from './services/workshop-resolve.service';
import { CalendarResolve } from './services/calendar-resolve.service';
import { UserResolve } from './services/user-resolve.service';

import { AdminGuard } from './core/admin.guard';
import { CanReadGuard } from './core/can-read.guard';
import { SupplierGuard } from './core/supplier.guard';

import { MaterialComponent } from './material/material.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddEventComponent } from './add-event/add-event.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MyReservationsComponent } from './reservation/my-reservations/my-reservations.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationsDisplayComponent } from './reservation/reservations-display/reservations-display.component';

const appRoutes: Routes = [
    {
        path: '', 
        component: UserProfileComponent
    },
    {
        path: 'home', 
        component: HomeComponentComponent,
        canActivate: [CanReadGuard]
    },
    {
        path: 'workshops', 
        component: WorkshopComponent,
        resolve: {
            workshops: WorkshopResolve
        },
        canActivate: [CanReadGuard]
    },
    {
        path: 'workshops/create', 
        component: AddWorkshopComponent,
        canActivate: [CanReadGuard]
    },
    {
        path: 'workshops/:id/edit', 
        component: EditWorkshopComponent
    },
    {
        path: 'materials', 
        component: MaterialComponent,
        resolve: {
            materials: MaterialResolve
        },
        canActivate: [CanReadGuard]
    },
    {
        path: 'materials/create', 
        component: AddMaterialComponent,
        canActivate: [CanReadGuard]
    },
    {
        path: 'materials/:id/edit', 
        component: EditMaterialComponent
    },
    {
        path: 'products', 
        component: ProductComponent,
        resolve: {
            products: ProductResolve
        },
        canActivate: [CanReadGuard]
    },
    {
        path: 'products/create', 
        component: AddProductComponent,
        canActivate: [CanReadGuard]
    },
    {
        path: 'products/:id/edit', 
        component: EditproductComponent
    },
    {
        path: 'calendar', 
        component: CalendarComponent,
        // resolve: {
        //     calendar: CalendarResolve
        // }
        canActivate: [CanReadGuard]
    },
    {
        path: 'calendar/create', 
        component: AddEventComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'reservations', 
        component: MyReservationsComponent,
        resolve: {
            reservations: ReservationResolve
        },
        canActivate: [CanReadGuard]
    },
    {
        path: 'reservations/create', 
        component: ReservationComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'reservations/display', 
        component: ReservationsDisplayComponent,
        resolve: {
            reservations: ReservationResolve
        },
        canActivate: [SupplierGuard]
    },
    {
        path: 'users', 
        component: UsersComponent,
        resolve: {
            users: UserResolve
        },
        canActivate: [AdminGuard]
    },
    {
        path: 'users/create', 
        component: AddUserComponent,
        canActivate: [AdminGuard]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class appRoute {

}

