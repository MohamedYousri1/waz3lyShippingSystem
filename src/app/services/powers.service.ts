import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PowersService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_powers  () :  Observable<any>{
    return this._HttpClient.get<any>(this.baseUrl + `/employeeRole`)  ;
  }

  // add new
  add_power(data: any , user_id){
    return this._HttpClient.post(this.baseUrl + `/user/${user_id}/syncPermissions` , data);
  }

  update
  edit_power(editData: any, powerId: number): Observable<any> {
    return this._HttpClient.post<any>(this.baseUrl + `/user/${powerId}/syncPermissions`, editData);
  }

  get_permission()
  {
    return this._HttpClient.get(`${this.baseUrl}/permissions`)
  }
  get_users()
  {
    return this._HttpClient.get(`${this.baseUrl}/employees`)
  }


    // delete
    delete_section(item: any):Observable<any>{
      return this._HttpClient.delete<any>(this.baseUrl +`permissions/${item.id}`)
  }

}
