import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {MatTableModule} from '@angular/material';
import { AppComponent } from './app.component';
import { MaterialComponent } from './material/material.component';
import { MaterialService } from './services/material.service';
import { WorkshopService } from './services/workshop.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { MainComponent } from './main/main.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';


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
<<<<<<< HEAD
   
=======
>>>>>>> 973407467f9dc965d2ffffa10ad28bd6147cd901
  ],
  imports: [
    BrowserModule,AngularFireModule.initializeApp(environment.firebase),AngularFirestoreModule,
    AngularFireAuthModule,AngularFireStorageModule,FormsModule
  ],
  providers: [MaterialService,WorkshopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
