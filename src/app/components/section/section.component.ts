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
  resource: any;
  currentImage: string = ''
  sortResource: any[] = []
  cat: string = 'Comercial Vehicle'
  search:string = ''
  searchedResource:any;
  constructor(private http: HttpService, private router: Router, private util: UtilityService) {
    util.search.subscribe(res=>{
      if(res){
        this.searching(res);
      }
      if(!res){
        this.ngOnInit()
      }
    })
    util.refresh.subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
    
  }
  
  ngOnInit(): void {
    this.util.changeCat.subscribe( res => this.cat = res)
    this.http.getDate('/api/vehicles',{type:this.cat})
      .subscribe((res: any) => {
        this.resource = res
        this.http.progress.next(false)
      })
  }
  searching(value:string): void {
    this.http.getDate('/api/vehicles',{search:value})
      .subscribe((res: any) => {
        this.resource = res
        this.cat = "Found result: "+res.length
        this.http.progress.next(false)
      })
  }

  showVehicle(id: string) {
    this.router.navigate(['/vehicle', id])
  }
  sort(value: string) {
    if (value === 'price') {
      return this.http.getDate('/api/vehicles', { sort: 'price',type:this.cat })
        .subscribe((res: any) => {
          this.resource = res.reverse()
          this.http.progress.next(false)
        })
    }
    if (value === 'year') {
      return this.http.getDate('/api/vehicles', { sort: 'year',type:this.cat })
        .subscribe((res: any) => {
          this.resource = res.reverse()
          this.http.progress.next(false)
        })
    }
    return
  }
}
