import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TargetsService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All(){
    return this._HttpClient.get<any>(this.baseUrl + `targets`)  ;
  }

  //add new
  add(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'targets', data);
  }

  //edit
  edit(editData: any, Id:number){
    return this._HttpClient.post<any>(this.baseUrl + `targets/${Id}?_method=PUT`, editData);
  }

  //post to employees target
  post_emp(data){
    return this._HttpClient.post<any>(`${this.baseUrl}targets/employee` , data);
  }

  //get one
  get_one(id){
    return this._HttpClient.get<any>(this.baseUrl + `targets/${id}`);
  }

}
