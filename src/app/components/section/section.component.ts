import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  resource:any;
  currentImage:string=''
  sortResource:any
  status:string= 'Comercial Vehicle'
  constructor(private http:HttpService,private router:Router,util:UtilityService) {
    util.refresh.subscribe(res => {
      if(res){
        this.ngOnInit()
      } 
    })
    }
  ngOnInit(): void {
    this.http.getDate('http://localhost:3000/api/vehicles')
    .subscribe((res:any)=> {
      this.resource = res
    })
  }

  showVehicle(id:string){
    this.router.navigate(['/vehicle',id])
  }
  sort(value:string){
      if(value==='year'){
        for(let item of this.resource){
          
        }
      }
  }
}
