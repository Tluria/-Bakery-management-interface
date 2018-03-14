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
import { NavbarComponent } from './navbar/navbar.component';
import { AddMaterialComponent } from './add-material/add-material.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialComponent,
    NavbarComponent,
    AddMaterialComponent,
  ],
  imports: [
    BrowserModule,AngularFireModule.initializeApp(environment.firebase),AngularFirestoreModule,
    AngularFireAuthModule,AngularFireStorageModule,FormsModule
  ],
  providers: [MaterialService],
  bootstrap: [AppComponent]
})
export class AppModule { }
