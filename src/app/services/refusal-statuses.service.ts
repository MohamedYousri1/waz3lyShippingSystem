import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefusalStatusesService {

  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';

  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All(){
    return this._HttpClient.get<any>(this.baseUrl + `refusal_statuses`)  ;
  }

  //add new
  add(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'refusal_statuses', data);
  }

  //edit
  edit(editData: any, jobId:number){
    return this._HttpClient.post<any>(this.baseUrl + `refusal_statuses/${jobId}?_method=PUT`, editData);
  }
}
