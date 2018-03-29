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
import { RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';


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
    HomeComponentComponent,
    EditWorkshopComponent,
=======
<<<<<<< HEAD
    HomeComponentComponent,
    EditWorkshopComponent,
    EditMaterialComponent,
=======
<<<<<<< HEAD
   
=======
<<<<<<< HEAD
    HomeComponentComponent,
    EditWorkshopComponent,
=======
<<<<<<< HEAD
   
=======
>>>>>>> 973407467f9dc965d2ffffa10ad28bd6147cd901
>>>>>>> 02da79abc6dd2c62f2639acea1c2395c8ed71472
>>>>>>> e6e41fb2ca2372215566987a40c3f8346fec7869
>>>>>>> 643679cb2a61cc3b8737de1dfcc6572fdfc88d77
>>>>>>> 1e32fab07371b7d2de9b3529003354091fbd5d46
  ],
  imports: [
    BrowserModule,AngularFireModule.initializeApp(environment.firebase),AngularFirestoreModule,
    AngularFireAuthModule,AngularFireStorageModule,FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponentComponent},
      {path: 'workshops', component: WorkshopComponent},
      {path: 'workshops/create', component: AddWorkshopComponent},
      {path: 'workshops/:id/edit', component: EditWorkshopComponent},
      {path: 'materials', component: MaterialComponent},
      {path: 'materials/create', component: AddMaterialComponent},
      {path: 'materials/:id/edit', component: EditMaterialComponent},
    ])
  ],
  providers: [MaterialService,WorkshopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
