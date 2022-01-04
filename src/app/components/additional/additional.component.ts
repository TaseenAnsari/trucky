import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.css']
})
export class AdditionalComponent implements OnInit {
  contact:any = []
  brand:any = []
  constructor(private http:HttpService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.http.getDate('/api/feature/contact').subscribe( (res:any) => {
      this.contact.push(res[0])
    })
    this.http.getDate('/api/feature/brand').subscribe( (res:any) => {
    this.brand.splice(0,this.brand.length)  
    res.map((value:any)=> this.brand.push(value))
    })
  }
  updateNumber(value:any){
    this.http.updateDate('/api/feature/contact/'+this.contact[0]._id,{number:value})
    .subscribe(res=> res)
  }
  savebrand(brand:any,type:any,content:any){
    console.log(brand.value)
    this.http.postDate('/api/feature/brand',{brand:brand.value,type:type.value})
    .subscribe(res=>this.ngOnInit())
    this.modalService.dismissAll()
  }

  deleteBrand(id:string){
    this.http.deleteDate('/api/feature/brand/'+id)
    .subscribe(res=> this.ngOnInit())
  }

  openbox(content:any){
    this.modalService.open(content)
  }

}
