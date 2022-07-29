import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http:HttpClient ,
    private router : Router
    ) {
    if(localStorage.getItem('user') !== null ) {
      this.saveCurrentUserData() ;
    }
   }
  currentUser:any = new BehaviorSubject(null) ;
  currentUser2:any = new BehaviorSubject(null) ;
   login (formData:any)
   {
    return this.http.post('https://waz3ly.net/dashboard/api/dashboard/login' , formData)
   }
   saveCurrentUserData()  {
     let encodedToken:any  = localStorage.getItem('user') ;
     let decodedToken = jwtDecode(encodedToken) ;
     this.currentUser.next(decodedToken) ;
    if(localStorage.getItem('employee'))
    {
      this.currentUser2.next(JSON.parse(localStorage.getItem('employee')))
    }
   }
   getToken()
   {
     return localStorage.getItem('user')  ;
   }
   logOut()  {
    this.currentUser.next(null) ;
    this.currentUser2.next(null) ;
    localStorage.removeItem('user') ;
    localStorage.removeItem('employee') ;
    this.router.navigate(['/login'])
  }

  getAccounts()
  {
    return this.http.get(`https://waz3ly.net/dashboard/api/dashboard/total-shipment-day`) ;
  }

  getMothShipmentCount()
  {
    return this.http.get(`https://waz3ly.net/dashboard/api/dashboard/count_shipment_month`)
  }

  getPercentageShipmentCount()
  {
    return this.http.get(`https://waz3ly.net/dashboard/api/dashboard/Statu_Shipment`)
  }

  getCountShipmentCount()
  {
    return this.http.get(`https://waz3ly.net/dashboard/api/dashboard/count_all_statu`)
  }
}
