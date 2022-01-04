import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    name:new FormControl(''),
    phone:new FormControl('')
  })

  ngOnInit(): void {
    if(localStorage.getItem('user')) return
    setTimeout(()=>{
      this.modalService.open(this.content);
    },2000)
    
  }
  onSubmit(){
    this.http.postDate('/api/customers',{name:this.form.get('name')?.value,phone:this.form.get('phone')?.value})
    .subscribe(res => localStorage.setItem('user',this.form.get('name')?.value))
  }
}

