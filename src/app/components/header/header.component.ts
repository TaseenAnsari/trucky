import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../utility.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin:boolean = false
  category:any[]=[
    'comercial',
    'car',
    'bike'
  ]
  banner:string = ''
 
  constructor(private util:UtilityService,private router:Router,private http:HttpService) {
    util.isAdmin.subscribe(res => this.isAdmin = res)
   }

  ngOnInit(): void {
    this.http.getDate('/api/feature/banner').subscribe((res:any)=>{
        this.banner = res[0].banner
    })
    
  }
  changeMenu(event:any){
    this.util.changeCat.next(event)
    this.router.navigate(['/'])
    this.util.refresh.next(true)
  }
  search(event:any){
    this.util.search.next(event.value);  
    this.router.navigate(['/']);
  }
}
