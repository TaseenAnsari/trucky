import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  resource:any
  id:any
  couter:number = 0
  currentImage:string=""
  isAdmin:any;
  constructor(private http:HttpService,private route:ActivatedRoute ,private router:Router,private util:UtilityService) { 
    this.util.isAdmin.subscribe(res => this.isAdmin = res)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(res => {
      this.id = res
    } )
    this.http.getDate('/api/vehicles/'+this.id.params.id)
    .subscribe((res:any)=> {
      this.resource = res
      this.currentImage = res[0].photo[0]
      this.http.progress.next(false)
    })
  }

  changeBack(){
    if(this.couter==0) return 
    this.currentImage = this.resource[0].photo[this.couter-1]
    this.couter-=1
  }
  changeFor(){
    if(this.couter>this.resource[0].photo.length-2) return 
    this.currentImage = this.resource[0].photo[this.couter+1]
    this.couter+=1
  }

  removePost(id:string){
    if(!confirm('are you sure')) return
    this.http.deleteDate('/api/vehicles/'+this.id.params.id)
    .subscribe(res=> this.router.navigate(['/']))
  }
  updatePost(id:string){
    this.router.navigate(['/vehicle/edit/'+this.id.params.id])
  }

}
