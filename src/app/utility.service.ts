import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  isAdmin = new Subject<boolean>()
  payload = new Subject<string>()
  refresh = new Subject<boolean>()
  constructor() { 
  }
}
