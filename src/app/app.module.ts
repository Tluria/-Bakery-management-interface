import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import appRoutes from './app.routes';

// Modules
import { AngularFireModule } from 'angularfire2'; 
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
import { MaterialComponent } from './material/material.component';
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
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { DateTimePickerComponent } from './calendar/mwl-calendar-month-view/mwl-calendar-month-view.component';

// Services
import { MaterialService } from './services/material.service';
import { WorkshopService } from './services/workshop.service';
import { ProductService } from './services/product.service';
import { CalendarService } from './services/calendar.service';


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
    HomeComponentComponent,
    EditWorkshopComponent,
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
    DateTimePickerComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule, 
    CommonModule,
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
  ],
  providers: [MaterialService, WorkshopService, ProductService, CalendarService],
  bootstrap: [AppComponent]
})

export class AppModule { }

