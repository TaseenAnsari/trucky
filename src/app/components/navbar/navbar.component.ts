import { Component, Input, OnInit } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isCollapsed:boolean=true ;
  isAdmin:boolean=false
  userEmail:string='user@info'
  navItems:any[] = [
  ]
  @Input('matMenuTriggerFor') menu: MatMenuPanel<any> | undefined
  constructor(private utility:UtilityService) { }

  ngOnInit(): void {
    this.utility.isAdmin.subscribe(res=> this.isAdmin = res)
    this.utility.payload.subscribe(res=> this.userEmail = res)
  }

}
