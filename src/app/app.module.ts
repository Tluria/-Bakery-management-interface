import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { appRoute } from './app.routes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment.prod';
import 'rxjs/add/operator/toPromise';

//resolves
import { ReservationResolve } from './services/reservation-resolve.service';
import { MaterialResolve } from './services/material-resolve.service';
import { ProductResolve } from './services/product-resolve.service';
import { WorkshopResolve } from './services/workshop-resolve.service';
import { CalendarResolve } from './services/calendar-resolve.service';
import { UserResolve } from './services/user-resolve.service';


// Modules
import { AngularFireModule } from 'angularfire2';  
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatTableModule } from '@angular/material';
import { CalendarModule } from 'angular-calendar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule} from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from './demo-utils/module';


// Components
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { MaterialComponent } from './material/material.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { MyReservationsComponent } from './reservation/my-reservations/my-reservations.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { MainComponent } from './main/main.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { ReservationItemComponent } from './reservation/reservation-item/reservation-item.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { ReservationsDisplayComponent } from './reservation/reservations-display/reservations-display.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddEventComponent } from './add-event/add-event.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { DateTimePickerComponent } from './calendar/mwl-calendar-month-view/mwl-calendar-month-view.component';

// Services
import { MaterialService } from './services/material.service';
import { WorkshopService } from './services/workshop.service';  
import { ProductService } from './services/product.service';
import { CalendarService } from './services/calendar.service';
import { ReservationService } from './services/reservation.service';
import { UserService } from './services/user.service';
import { UpdateReservationsService } from './services/update-reservations.service';


@NgModule({
  declarations: [
    AppComponent,  
    MaterialComponent, 
    NavbarComponent,
    AddMaterialComponent,
    HeaderComponent,
    AsideComponent,
    AsideNavComponent,
    MainComponent,
    WorkshopComponent,
    AddWorkshopComponent,
    ProductComponent,
    AddProductComponent,
    HomeComponentComponent,
    EditWorkshopComponent,
    EditMaterialComponent,
    HomeComponentComponent,
    EditWorkshopComponent,
    EditproductComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    DateTimePickerComponent,
    AddEventComponent,
    ReservationComponent,
    ReservationListComponent,
    ReservationItemComponent,
    ReservationDetailComponent,
    ReservationsDisplayComponent,
    UserProfileComponent,
    UsersComponent,
    AddUserComponent,
    MyReservationsComponent 
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    appRoute,
    BrowserAnimationsModule, 
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, AngularFireStorageModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatSortModule, 
    MatButtonModule,
    ToastModule.forRoot(),
    NgxChartsModule,
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    MaterialResolve,
    UserResolve,
    ReservationResolve,
    ProductResolve,
    WorkshopResolve,
    CalendarResolve,
    MaterialService,   
    WorkshopService, 
    ProductService, 
    CalendarService,
    ReservationService,
    UserService,
    UpdateReservationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
