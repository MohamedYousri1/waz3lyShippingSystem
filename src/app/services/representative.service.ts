import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepresentativeService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient: HttpClient) {}

  get_represenative(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'all-representative');
  }

  emp_register(registerationData: any){
    return this._HttpClient.post(this.baseUrl + 'create-representative', registerationData);
  }

  // update
  emp_update(editData: any, represenativeId: number): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `update-representative/${represenativeId}`, editData);
  }


  changePass(data){
    return this._HttpClient.post<any>(`${this.baseUrl}change-Password-user-profile`, data)

  }
  changePassword(data){
    return this._HttpClient.post(this.baseUrl + `changePassword?_method=PUT` , data)
    // https://localhost/waz3ly/api/changePassword?_method=PUT
  }

    //active
    active(obj){
      return this._HttpClient.post<any>(`${this.baseUrl}active-user/${obj.user?.id}`, obj.user?.id)
    }

    //deactive
    de_active(obj){
      return this._HttpClient.post<any>(`${this.baseUrl}no-active-user/${obj.user?.id}`, obj.user?.id)
    }



}
