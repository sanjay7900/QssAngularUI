import { Routes } from '@angular/router';
import { ViewEmployeeComponent } from './Components/view-employee/view-employee.component';
import { CreateUpdateComponent } from './Components/create-update-employee/create-update-employee.component';

export const routes: Routes = [
    {path:"",redirectTo:"viewEmployees",pathMatch:"full"},
    {path:"viewEmployees",component:ViewEmployeeComponent},
    {path:"Update/:id",component:CreateUpdateComponent},
    {path:"Create",component:CreateUpdateComponent}
];
