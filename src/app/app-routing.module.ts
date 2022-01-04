import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './components/section/section.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { UpdatepostComponent } from './components/updatepost/updatepost.component';
import { UsersComponent } from './components/users/users.component';
import { AdditionalComponent } from './components/additional/additional.component';

const routes: Routes = [
  {
    path:'',
    component:SectionComponent
},
{
  path:'vehicle/:id',
  component:VehiclesComponent
},
{
  path:'vehicle/edit/:id',
  component:UpdatepostComponent,
  canActivate:[AuthGuard]
},
{
  path:'admin',
  component:AdminComponent,
  canActivate:[AuthGuard]
},
{
  path:'admin/login',
  component:LoginComponent,
},
{
  path:'admin/users',
  component:UsersComponent,
  canActivate:[AuthGuard]
},
{
  path:'admin/additional-feature',
  component:AdditionalComponent,
  canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
