import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../post/post.service';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  photos:any;
  fileuploaded:any[]=[]
  filename:any[] = []
  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private http:PostService,
    private route:Router,
    private util:UtilityService
    ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  form = new FormGroup({
    type:new FormControl(''),
    brand:new FormControl(''),
    model:new FormControl(''),
    kmDriven:new FormControl(''),
    year:new FormControl(''),
    price:new FormControl(''),
    desc:new FormControl(''),
    
  })
  ngOnInit(): void {
    
  }
  onSubmit(){
    console.log("submited")
    this.http.postDate(
      {
        type:this.form.get('type')?.value,
        brand:this.form.get('brand')?.value,
        model:this.form.get('model')?.value,
        year:this.form.get('year')?.value,
        price:this.form.get('price')?.value,
        kmDriven:this.form.get('kmDriven')?.value,
        photo:this.filename,
        description:this.form.get('desc')?.value
      }).subscribe( res=> {
        console.log(res)
        this.util.refresh.next(true)
        this.form.reset()
        this.fileuploaded = []
      })
  }
  send(event:any){
    console.log("jdklsfj")
    this.http.upload(event.files).subscribe( (res:any) => {
      for(let item of res){

        this.fileuploaded.push({filename:item.filename,filesize:Math.round(Number(item.size)/1024)+'kb'})
        this.filename.push(item.filename)
      }
    })

  }
 
  open(content:any){
    this.modalService.open(content)
  }
  remove(id:number){
    this.fileuploaded.splice(id,1)
    this.filename.splice(id)
  }
}
