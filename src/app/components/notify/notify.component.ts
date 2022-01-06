import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  customers:any[] = []
  constructor(config: NgbModalConfig
    ,private modalService: NgbModal
    ,private http:HttpService,) { }

  ngOnInit(): void {
    this.http.getDate('/api/feature/customers').subscribe((res:any)=> {
      this.customers = res
      this.http.progress.next(false)
    })
  }
  open(content: any) {
    this.modalService.open(content)
  }
  delete(id:string){
    if(!confirm('are you sure')) return
    this.http.deleteDate('/api/feature/customers/'+id).subscribe((res:any)=>{
      if(res.deletedCount==1) this.ngOnInit()
    })
  }

}
