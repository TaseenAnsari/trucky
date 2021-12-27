import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router,) { }

  form = new FormGroup({
    type: new FormControl(''),
    brand: new FormControl(''),
    model: new FormControl(''),
    kmDriven: new FormControl(''),
    year: new FormControl(''),
    price: new FormControl(''),
    desc: new FormControl(''),
    file: new FormControl(''),

  })
  ngOnInit(): void {
    this.route.paramMap.subscribe(res => this.id = res)
    this.http.getDate('http://localhost:3000/api/vehicles/' + this.id.params.id)
      .subscribe((res: any) => {
        this.resource = res
        res[0].photo.map((value: any)=>{
          this.fileuploaded.push(value)
        })
        this.form.get('type')?.setValue(res[0].type)
        this.form.get('brand')?.setValue(res[0].brand)
        this.form.get('model')?.setValue(res[0].model)
        this.form.get('year')?.setValue(res[0].year)
        this.form.get('kmDriven')?.setValue(res[0].kmDriven)
        this.form.get('price')?.setValue(res[0].price)
        this.form.get('desc')?.setValue(res[0].description)
      })
  }

  onSubmit() {
    this.http.updateDate('http://localhost:3000/api/vehicles/'+this.id.params.id,
      {
        type: this.form.get('type')?.value,
        brand: this.form.get('brand')?.value,
        model: this.form.get('model')?.value,
        year: this.form.get('year')?.value,
        price: this.form.get('price')?.value,
        kmDriven: this.form.get('kmDriven')?.value,
        photo: this.fileuploaded,
        description: this.form.get('desc')?.value
      }).subscribe(res => {
        console.log(res)
        this.router.navigate(['/vehicle/'+this.id.params.id])
      })
  }

  send(event: any) {
    this.http.upload(event.files).subscribe((res: any) => {
      for (let item of res) {
        this.fileuploaded.push(item.filename)
        this.filename.push(item.filename)
        this.form.get('file')?.reset()
      }
    })
  }

  remove(id: number) {
    this.fileuploaded.splice(id, 1)
    this.filename.splice(id)
    this.form.get('file')?.reset()
  }

  cancel() {
    this.router.navigate(['/vehicle/'+this.id.params.id])
  }

}
