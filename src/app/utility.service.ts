import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  isAdmin = new BehaviorSubject(false)
  changeCat = new BehaviorSubject('comercial')
  search = new BehaviorSubject('')
  payload = new Subject<string>()
  refresh = new Subject<boolean>()
  constructor() { 
  }
}
