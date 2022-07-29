import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private  http:AuthService , private  router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      debugger
      if(this.http.currentUser2.getValue() !== null  && (JSON.parse(localStorage.getItem('employee')).user_type == "admin" || JSON.parse(localStorage.getItem('employee')).user_type == "employee"  ) )  {
        return true
      }else {
        this.router.navigate(['/login']) ;
        this.http.logOut()
        return false ;
      }
      // else if(this.http.currentUser2.getValue() !== null  && JSON.parse(localStorage.getItem('employee')).is_company == 1 )
      // {
      //   this.router.navigate(['/shipment_company']) ;
      //   return false
      // }else if(this.http.currentUser2.getValue() !== null  && JSON.parse(localStorage.getItem('employee')).is_company == 1 )
      // {
      //   this.router.navigate(['/shipment_company']) ;
      //   return false
      // }
  }
}
