import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $:any ;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http:AuthService , private router:Router , private  _http :HttpClient ) { }
  msg:string ='' ;
  loginForm:any = new FormGroup({
    email  :new FormControl (null , [Validators.required , Validators.email]) ,
    password  :new FormControl(null, [Validators.required ] )
  }) ;

  ngOnInit(): void {
    debugger
  }
  get_contact()
  {
    // debugger
  }
errMsg:string='';
submitForm(loginForm:any){
  // debugger
    if(loginForm.valid)  {
      this.http.login(loginForm.value).subscribe((response:any)=>{
        if(!response.error) {
         this.saveLocal(response);
        }else {
          console.log(response);
          this.msg =  response.error ;
        }
      },err=>{
        // console.log(err);
        this.errMsg = err.error;
        console.log(this.errMsg);
        if(err.error){
          this.errMsg= "email or password not found "
        }else{
          this.errMsg =''
        }
      })
    }
  }

  async saveLocal(response){
    debugger
    await localStorage.setItem('user' , response.access_token)  ;
    await localStorage.setItem('needAds' , 'true')  ;

    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    var headers_object = headers.set("Authorization", "Bearer " + response.access_token);
  var that = this;
    await this._http.get(`https://waz3ly.net/dashboard/api/dashboard/user-profile` ,{ headers : headers_object} ).subscribe(res =>  {
      localStorage.setItem('employee' , JSON.stringify(res)) ;
      console.log(res);
    }, (error)=> {
      console.log(error);
    }, ()=>  {
      if(localStorage.getItem('employee') && (JSON.parse(localStorage.getItem('employee'))?.user_type == 'admin' || JSON.parse(localStorage.getItem('employee'))?.user_type == 'employee' ))
      {
        that.http.saveCurrentUserData();
        that.router.navigate(['/home']);
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }else if(localStorage.getItem('employee') && JSON.parse(localStorage.getItem('employee')).user_type == 'company')
      {
       that.http.saveCurrentUserData();
        that.router.navigate(['/home-companies']);

      }else
      {
        that.router.navigate(['/login']);
      }
    })
  }
}
      // else if(localStorage.getItem('employee') && JSON.parse(localStorage.getItem('employee')).is_company == 1)
      // {
      //   that.http.saveCurrentUserData();
      //   that.router.navigate(['/shipment_company']);
      //   setTimeout(() => {
      //     window.location.reload()
      //   }, 500);
      // }
