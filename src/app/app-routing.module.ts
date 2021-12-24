import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './components/section/section.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { PostComponent } from './components/post/post.component';

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
  path:'admin',
  component:AdminComponent,
  canActivate:[AuthGuard]
},
{
  path:'admin/login',
  component:LoginComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
