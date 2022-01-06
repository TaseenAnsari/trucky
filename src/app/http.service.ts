import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';;
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  progress = new BehaviorSubject(false)
  baseUrl = 'https://trucky.herokuapp.com'
  constructor(public http:HttpClient,@Inject('url') @Optional() public url:string) { }

  login(email:string,password:string){
    return this.http.post(this.baseUrl+this.url,{email:email,password:password})
  }

  verifyToken(){
    return this.http.get(this.baseUrl+'/api/auth/verify-token',{ headers:{
      'x-auth-token' : String(localStorage.getItem('token'))
    }})
  }


  getDate(url:string,querry?:any){
    this.progress.next(true)
    return this.http.get(this.baseUrl+url,{params:querry,headers:{
      'x-auth-token' : String(localStorage.getItem('token'))
    }})
  }

  upload(path:string,upload:any,id?:string){
    let formdata= new FormData();
    for(let mul of upload){
      formdata.append('files',mul)

    }
    if(!id) id = ''
    return this.http.post(this.baseUrl+path+id,formdata)
  }

  postDate(url:string,resource:any){
    return this.http.post(this.baseUrl+url,resource,
      {
        headers:{
          "x-auth-token":String(localStorage.getItem('token'))
      }})
  }

  deleteDate(url:string){
    return this.http.delete(this.baseUrl+url,{
      headers:{
        "x-auth-token":String(localStorage.getItem('token'))
    }})
  }
  updateDate(url:string,resource:any){
    return this.http.put(this.baseUrl+url,resource,{
      headers:{
        "x-auth-token":String(localStorage.getItem('token'))
    }
  })
}
}
