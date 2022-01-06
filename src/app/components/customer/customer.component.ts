import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild("content") content: ElementRef | undefined;
  constructor(config: NgbModalConfig, private modalService: NgbModal,private http:CustomerService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  form = new FormGroup({
    name:new FormControl('',Validators.required),
    phone:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)])
  })

  ngOnInit(): void {
    if(localStorage.getItem('user')) return
    setTimeout(()=>{
      this.modalService.open(this.content);
    },2000)
    
  }
  onSubmit(){
    if(!this.form.valid) return 
    console.log(Number(this.form.get('phone')?.value))
    if(!Number(this.form.get('phone')?.value)) return 
    this.http.postDate('/api/customers',{name:this.form.get('name')?.value,phone:this.form.get('phone')?.value})
    .subscribe((res:any) => localStorage.setItem('user',res.name))
  }
}

