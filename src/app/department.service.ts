import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private BaseUrl : string='https://waz3ly.net/dashboard/api/dashboard/'

  constructor(private _HttpClient:HttpClient) { }

  getDepartment():Observable<any>
  {
    return this._HttpClient.get(this.BaseUrl +'departments')
  }


  // sending Data Using Post Method
  sendDepartment(registerationData: any):Observable<any>
  {
    return this._HttpClient.post(this.BaseUrl +'departments' , registerationData )
  }

}
