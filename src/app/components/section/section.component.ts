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
    util.refresh.subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
    
  }
  
  ngOnInit(): void {
    this.util.changeCat.subscribe( res => this.cat = res)
    this.http.getDate('http://localhost:3000/api/vehicles',{type:this.cat})
      .subscribe((res: any) => {
        console.log(res)
        this.resource = res
      })
  }

  showVehicle(id: string) {
    this.router.navigate(['/vehicle', id])
  }
  sort(value: string) {
    if (value === 'price') {
      return this.http.getDate('http://localhost:3000/api/vehicles', { sort: 'price',type:this.cat })
        .subscribe((res: any) => this.resource = res.reverse())
    }
    if (value === 'year') {
      return this.http.getDate('http://localhost:3000/api/vehicles', { sort: 'year',type:this.cat })
        .subscribe((res: any) => {
          this.resource = res.reverse()
        })
    }
    return
  }
}
