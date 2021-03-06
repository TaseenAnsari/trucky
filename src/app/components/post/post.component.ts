import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../post/post.service';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  photos: any;
  fileuploaded: any[] = []
  filename: any[] = []
  brands:any=[]
  loader:boolean = false
  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private http: PostService,
    private util: UtilityService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  form = new FormGroup({
    type: new FormControl('',Validators.required),
    brand: new FormControl('',Validators.required),
    model: new FormControl('',Validators.required),
    kmDriven: new FormControl('',[Validators.required]),
    year: new FormControl('',[Validators.required,Validators.min(2001),Validators.max(2022)]),
    price: new FormControl('',Validators.required),
    desc: new FormControl(''),
    file: new FormControl(''),

  })
  ngOnInit(): void {
    this.http.getDate('/api/feature/brand').subscribe( (res:any) => {
    this.brands.splice(0,this.brands.length) 
    res.map((value:any)=> this.brands.push(value))
    this.http.progress.next(false)
    })
  }
  onSubmit() {
    return this.http.postDate('/api/vehicles',
      {
        type: this.form.get('type')?.value,
        brand: this.form.get('brand')?.value,
        model: this.form.get('model')?.value,
        year: this.form.get('year')?.value,
        price: this.form.get('price')?.value,
        kmDriven: this.form.get('kmDriven')?.value,
        photo: this.filename,
        description: this.form.get('desc')?.value
      }).subscribe(res => {
        this.util.refresh.next(true)
        this.form.reset()
        this.fileuploaded.splice(0, this.fileuploaded.length)
        this.filename.splice(0, this.filename.length)
      })
  }
  send(event: any) {
    this.loader = true
    this.http.upload('/api/vehicles/upload',event.files).subscribe((res: any) => {
      for (let item of res) {
        this.fileuploaded.push({ key: item.key, filesize: Math.round(Number(item.size) / 1024) + 'kb' })
        this.filename.push(item.key)
        this.form.get('file')?.reset()
        this.loader = false
      }
    })

  }
  open(content: any) {
    this.modalService.open(content)
  }
  remove(id: number) {
    this.fileuploaded.splice(id, 1)
    this.filename.splice(id)
  }
}
