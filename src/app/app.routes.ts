import { MaterialComponent } from './material/material.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CalendarComponent } from './calendar/calendar.component';


export default [    
    {path: '', component: HomeComponentComponent},
    {path: 'workshops', component: WorkshopComponent},
    {path: 'workshops/create', component: AddWorkshopComponent},
    {path: 'workshops/:id/edit', component: EditWorkshopComponent},
    {path: 'materials', component: MaterialComponent},
    {path: 'materials/create', component: AddMaterialComponent},
    {path: 'materials/:id/edit', component: EditMaterialComponent},
    {path: 'products', component: ProductComponent},
    {path: 'products/create', component: AddProductComponent},
    {path: 'products/:id/edit', component: EditproductComponent},
    {path: 'calendar', component: CalendarComponent},
];

