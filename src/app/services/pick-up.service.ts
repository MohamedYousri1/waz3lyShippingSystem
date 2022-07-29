import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PickUpService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_pickups  () :  Observable<any>{
    return this._HttpClient.get<any>(this.baseUrl + `pickup`)  ;
  }

  // add new
  add_pickup(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'pickup', data);
  }

  // update
  edit_pickup(editData: any, pickupId: number): Observable<any> {
    return this._HttpClient.post<any>(this.baseUrl + `pickup/${pickupId}?_method=PUT`, editData);
  }

    // delete
    delete_section(item: any):Observable<any>{
      return this._HttpClient.delete<any>(this.baseUrl +`pickup/${item.id}`)
  }
}
