
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../shared/models/area';

@Injectable({
  providedIn: 'root'
})

export class AreasService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All(){
    return this._HttpClient.get<any>(this.baseUrl + `areas`)  ;
  }

  // getting areas in Province
  get_area_inProvince(province_id : any )
  {
    return this._HttpClient.get(this.baseUrl + `areas/${province_id}`) ;
  }
  get_area_inProvinceReady(province_id : any )
  {
    return this._HttpClient.get(this.baseUrl + `cityGovernorate/${province_id}`) ;
  }
  get_areaShipping(province_id : any )
  {
   return  this._HttpClient.get(this.baseUrl + `areaShipmentPrice/${province_id}`)
  }
  //add new
  add(data: any){
    return this._HttpClient.post<Area>(this.baseUrl + 'areas', data);
  }

  //edit
  edit(editData: any, jobId:number){
    return this._HttpClient.post<Area>(this.baseUrl + `areas/${jobId}?_method=PUT`, editData);
  }



  // delete
  delete_section(item: any):Observable<any>{
    return this._HttpClient.delete<any>(this.baseUrl +`areas/${item.id}`)
}


}
