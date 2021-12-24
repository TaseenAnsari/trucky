import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../../utility.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validator:any;
  
  form = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])
  })
  constructor(private util:UtilityService,private auth:AuthService,private router:Router) { 
  }
  get email(){
    return this.form.get('email')
  }
  get password(){
    return this.form.get('password')
  }
  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.form.valid) return
    this.auth.login(this.email?.value,this.password?.value)
    .subscribe((res:any) =>{
      if(res.message){
        return this.validator = {message:res.message}
      }
      localStorage.setItem('token',res.token)
      this.util.isAdmin.next(true);
      this.router.navigate(['/admin'])
      return 
    });
  }

}
