import { Component } from '@angular/core';
import { UtilityService } from './utility.service';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trucky';
  constructor(private util:UtilityService, private http: HttpService){
  }
  ngOnInit(): void {
    this.http.verifyToken().subscribe((res:any)=>{
      if(res.email){
        localStorage.setItem('email',res.email)
        this.util.isAdmin.next(true)
      }
      else  {
        this.util.isAdmin.next(false)
      }
    })
  }
  
}
