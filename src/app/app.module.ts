import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { SectionComponent } from './components/section/section.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './components/customer/customer.component';
import { PostComponent } from './components/post/post.component';
import { UpdatepostComponent } from './components/updatepost/updatepost.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    SectionComponent,
    VehiclesComponent,
    AdminComponent,
    LoginComponent,
    CustomerComponent,
    PostComponent,
    UpdatepostComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
