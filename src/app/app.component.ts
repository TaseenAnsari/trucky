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
  progress = 10
  inprogress = false
  constructor(private util:UtilityService, private http: HttpService){
    this.http.progress.subscribe(res=>{
        this.inprogress = res
        this.progressing()

    })
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

  progressing(){
    let  inter = setInterval(()=>{
      if(this.inprogress){
        if(this.progress<85){
          this.progress+=1
        }

      }
      else{
        this.progress = 0 
        clearInterval(inter)
      }  
    },100)
  }
  
}
