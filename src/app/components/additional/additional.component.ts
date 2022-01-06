import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/http.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.css']
})
export class AdditionalComponent implements OnInit {
  contact:any[] = []
  brand:any = []
  fileuploaded:any[] = []
  loader:boolean = false
  constructor(private http:HttpService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.http.progress.subscribe(res => this.loader = res)
    this.http.getDate('/api/feature/contact').subscribe( (res:any) => {
      if(!res[0]) return
      this.contact.push(res[0])
      this.http.progress.next(false)
    })
    this.http.getDate('/api/feature/brand').subscribe( (res:any) => {
    this.brand.splice(0,this.brand.length)  
    res.map((value:any)=> this.brand.push(value))
    this.http.progress.next(false)
    })
    this.http.getDate('/api/feature/banner').subscribe((res:any)=>{
      this.fileuploaded = [];
      this.fileuploaded.push({id:res[0]._id,banner:res[0].banner})
      this.http.progress.next(false)
    })
  }


  updateNumber(value:any){
    let id = ''
    if(this.contact.length>0) id = this.contact?.[0]._id
    this.http.updateDate('/api/feature/contact/'+id,{phone:value})
    .subscribe(res=> {  })
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
  send(event:any){
    let id = ''
    if(this.fileuploaded[0].id) id = this.fileuploaded[0].id
    this.loader = true
    this.fileuploaded = []
    this.http.upload('/api/feature/banner/'+id,event.files).subscribe( (res:any)=> {
      this.ngOnInit()
      this.loader = false
    })
  }
  remove(){
    
  }

}
