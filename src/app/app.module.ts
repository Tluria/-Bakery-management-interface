import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatTableModule } from '@angular/material';
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
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule} from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { EditproductComponent } from './editproduct/editproduct.component';
import appRoutes from './app.routes';
import { LoadChildren } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single, multi } from '../data.ts';


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
  ],
  imports: [
    BrowserModule,AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule,
    AngularFireAuthModule, AngularFireStorageModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatButtonModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MaterialService, WorkshopService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
