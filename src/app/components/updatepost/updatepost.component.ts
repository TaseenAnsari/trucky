import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
export class UpdatepostComponent implements OnInit {
  fileuploaded: any[] = []
  filename: any[] = []
  id: any
  resource: any
  currentImage: string = ""
  brands:any=[]
  validateMessage = ""
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router,) { }

  form = new FormGroup({
    type: new FormControl('',Validators.required),
    brand: new FormControl('',Validators.required),
    model: new FormControl('',Validators.required),
    kmDriven: new FormControl('',[Validators.required]),
    year: new FormControl('',[Validators.required,Validators.min(2001),Validators.max(2022)]),
    price: new FormControl('',[Validators.required]),
    desc: new FormControl(''),
    file: new FormControl(''),

  })
  ngOnInit(): void {
    this.http.getDate('/api/feature/brand').subscribe( (res:any) => {
      this.brands.splice(0,this.brands.length) 
      res.map((value:any)=> this.brands.push(value))
      })
    this.route.paramMap.subscribe(res => this.id = res)
    this.http.getDate('/api/vehicles/' + this.id.params.id)
      .subscribe((res: any) => {
        this.resource = res
        res[0].photo.map((value: any)=>{
          this.filename.push(value)
        })
        this.form.get('type')?.setValue(res[0].type)
        this.form.get('brand')?.setValue(res[0].brand)
        this.form.get('model')?.setValue(res[0].model)
        this.form.get('year')?.setValue(res[0].year)
        this.form.get('kmDriven')?.setValue(res[0].kmDriven)
        this.form.get('price')?.setValue(res[0].price)
        this.form.get('desc')?.setValue(res[0].description)
        this.http.progress.next(false)
      })
  }

  onSubmit() {
    this.http.updateDate('/api/vehicles/'+this.id.params.id,
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
        console.log(res)
        this.router.navigate(['/vehicle/'+this.id.params.id])
      })
  }

  send(event: any) {
    this.http.upload(event.files).subscribe((res: any) => {
      for (let item of res) {
        console.log(item)
        this.fileuploaded.push({ key: item.key, filesize: Math.round(Number(item.size) / 1024) + 'kb' })
        this.filename.push(item.key)
        this.form.get('file')?.reset()
      }
    })
  }

  remove(id: number) {
    this.fileuploaded.splice(id, 1)
    this.filename.splice(id,1)
    this.form.get('file')?.reset()
  }

  cancel() {
    this.router.navigate(['/vehicle/'+this.id.params.id])
  }

  validateNumber(event:any){
    if(!Number(event)){
        return false
    }
    else{
      return true
    }
  }

}
