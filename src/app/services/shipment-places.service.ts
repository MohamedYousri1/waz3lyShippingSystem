import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ShipmentPlacesService {

  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All (){
    return this._HttpClient.get<any>(this.baseUrl + `shipping-area-price`)  ;
  }
  get_areas()
  {
    return this._HttpClient.get(this.baseUrl +  `areas`) ;
  }

  // add new
  add(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'shipping-area-price', data);
  }

  // update
  edit(editData: any, jobId:number){
    return this._HttpClient.post<any>(this.baseUrl + `shipping-area-price/${jobId}?_method=PUT`, editData);
  }


  delete_section(item: any):Observable<any>{
    return this._HttpClient.delete<any>(this.baseUrl  +`shipping-area-price/${item.id}`)
}

  //get to_ itmes
  toarea(area_id){
    return this._HttpClient.get<any>(`${this.baseUrl}shipping-area-price/areas/${area_id}`)
  }
}
