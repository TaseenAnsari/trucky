import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  catagory:any[]=[
    'comercial',
    'car',
    'bike'
  ]
  constructor(private util:UtilityService) { }

  ngOnInit(): void {
  }
  changeMenu(event:any){
    this.util.changeCat.next(event)
    this.util.refresh.next(true)
  }
  search(event:any){
    this.util.search.next(event.target.value);
  }
}
