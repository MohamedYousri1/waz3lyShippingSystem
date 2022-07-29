import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShipmentTypesService {

  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All (){
    return this._HttpClient.get<any>(this.baseUrl + `service_type`)  ;
  }

  // add new
  add(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'service_type', data);
  }

  // update
  edit(editData: any, jobId:number){
    return this._HttpClient.post<any>(this.baseUrl + `service_type/${jobId}?_method=PUT`, editData);
  }
  delete_section(item: any):Observable<any>{
    return this._HttpClient.delete<any>(this.baseUrl +`service_type/${item.id}`)
}


get_AdditionalServices (){
  return this._HttpClient.get<any>(this.baseUrl + `additional-service`)  ;
}

// add new
addAdditionalService(data: any){
  return this._HttpClient.post<any>(this.baseUrl + 'additional-service', data);
}

// update
editAdditionalService(editData: any, jobId:number){
  return this._HttpClient.post<any>(this.baseUrl + `additional-service/${jobId}?_method=PUT`, editData);
}
delete_AdditionalService(item: any):Observable<any>{
  return this._HttpClient.delete<any>(this.baseUrl +`additional-service/${item.id}`)
}

}
