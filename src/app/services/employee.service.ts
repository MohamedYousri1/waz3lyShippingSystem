import { IEmployee } from './../shared/models/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';


  constructor(private _HttpClient: HttpClient) {}

  get_client(user_id)
  {
   return  this._HttpClient.get<any>(`${this.baseUrl}employee/${user_id}/getClients`)
  }

  employ(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'all-employees');
  }

changePassword(data){
  return this._HttpClient.post(this.baseUrl + `changePassword?_method=PUT` , data)
  // https://localhost/waz3ly/api/changePassword?_method=PUT
}
  emp_register(registerationData: any){
    return this._HttpClient.post(this.baseUrl + 'create-employees', registerationData);
  }

  // update
  emp_update(editData: any, empId: number): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `update-employees/${empId}`, editData);
  }
  // delete
  // delete_data(delete_info: any):Observable<any>
  // {
  //     return this._HttpClient.post<IEmployee>(this.baseUrl +`employees/${delete_info.id}?_method=PUT`,delete_info)
  // }
  getDeparments  () :Observable<any>
  {
    return this._HttpClient.get<any[]>(this.baseUrl + `departments`)  ;
  }
  //active
  active(obj){
    return this._HttpClient.post<any>(`${this.baseUrl}active-user/${obj.user?.id}`, obj.user?.id)
  }
  //deactive
  de_active(obj){
    return this._HttpClient.post<any>(`${this.baseUrl}no-active-user/${obj.user?.id}`, obj.user?.id)
  }
    // delete
    delete_section(item: any):Observable<any>{
      return this._HttpClient.delete<any>(this.baseUrl +`destroy-employees/${item.id}`)
  }
  changePass(data){
    return this._HttpClient.post<any>(`${this.baseUrl}change-Password-user-profile`, data)
  }
  changeRole(formData : FormData)
{
  return this._HttpClient.post(this.baseUrl +  `changeRole` , formData)
}


}
