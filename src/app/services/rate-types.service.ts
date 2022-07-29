import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateTypesService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All(){
    return this._HttpClient.get<any>(this.baseUrl + `rate_types`)  ;
  }

  //add new
  add(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'rate_types', data);
  }

  //edit
  edit(editData: any, jobId:number){
    return this._HttpClient.post<any>(this.baseUrl + `rate_types/${jobId}?_method=PUT`, editData);
  }


    // delete
    delete_section(item: any):Observable<any>{
      return this._HttpClient.delete<any>(this.baseUrl +`rate_types/${item.id}`)
  }

}
