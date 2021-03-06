import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends HttpService{

  constructor(http:HttpClient) {
    super(http,'/api/customers')
   }
}
