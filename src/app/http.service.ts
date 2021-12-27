import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http:HttpClient,@Inject('url') @Optional() public url:string) { }

  login(email:string,password:string){
    return this.http.post(this.url,{email:email,password:password})
  }

  verifyToken(){
    return this.http.get('http://localhost:3000/api/auth/verify-token',{ headers:{
      'x-auth-token' : String(localStorage.getItem('token'))
    }})
  }


  getDate(url:string,querry?:any){
    return this.http.get(url,{params:querry})
  }

  upload(upload:any){
    console.log(upload)
    let formdata= new FormData();
    for(let mul of upload){
      formdata.append('files',mul)

    }
    return this.http.post('http://localhost:3000/api/vehicles/upload',formdata)
  }

  postDate(resource:any){
    return this.http.post(this.url,resource)
  }

  deleteDate(url:string){
    return this.http.delete(url,{
      headers:{
        "x-auth-token":String(localStorage.getItem('token'))
    }})
  }
  updateDate(url:string,resource:any){
    return this.http.put(url,resource,{
      headers:{
        "x-auth-token":String(localStorage.getItem('token'))
    }
  })
}
}
