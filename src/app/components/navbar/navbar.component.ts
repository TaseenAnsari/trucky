import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { UtilityService } from '../../utility.service';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';

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
  constructor(private utility:UtilityService , private router:Router) { }

  ngOnInit(): void {
    this.userEmail = String(localStorage.getItem('email'))
    this.utility.isAdmin.subscribe(res=> this.isAdmin = res)
    this.utility.payload.subscribe(res=> this.userEmail = res)
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''])
    this.utility.isAdmin.next(false)
  }

}
