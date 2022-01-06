import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  contact:any[] = []
  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.http.getDate('/api/feature/contact').subscribe( (res:any) => {
      this.contact.push(res[0])
    })
  }

}
