
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prov } from '../shared/models/prov';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {

  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All(){
    return this._HttpClient.get<any>(this.baseUrl + `provinces`)  ;
  }
  get_ProvincesReady(){
    return this._HttpClient.get<any>(this.baseUrl + `governorate`)  ;
  }

  //add new
  add(data: any){
    return this._HttpClient.post<Prov>(this.baseUrl + 'provinces', data);
  }

  //edit
  edit(editData: any, jobId:number){
    return this._HttpClient.post<Prov>(this.baseUrl + `provinces/${jobId}?_method=PUT`, editData);
  }


  getAreas ()
  {
    return this._HttpClient.get(`https://waz3ly.net/dashboard/api/dashboard/areas`) ;
  }

  get_shipment_places()
  {
    return this._HttpClient.get(`https://waz3ly.net/dashboard/api/dashboard/shipment_places`) ;
  }
  getDataPlaces(from , to)
  {
    return this._HttpClient.get(`https://waz3ly.net/dashboard/api/dashboard/getShipmentPlaces/from/${from}/to/${to}`)
  }

  getToAreaId(id)
  {
    debugger
    return this._HttpClient.get(`https://waz3ly.net/dashboard/api/dashboard/shipment_places/areas/${id}`)
  }

  delete_section(item: any):Observable<any>{
    return this._HttpClient.delete<any>(this.baseUrl +`provinces/${item.id}`)
}
}
