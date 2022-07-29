import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageSystemService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_storage_system  () :  Observable<any>{
    return this._HttpClient.get<any>(this.baseUrl + `storage-system`);
  }

  // add new
  add_storage_system(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'storage-system', data);
  }

  // update
  edit_storage_system(editData: any, storage_systemId: number): Observable<any> {
    return this._HttpClient.post<any>(this.baseUrl + `storage-system/${storage_systemId}?_method=PUT`, editData);
  }

    // delete
    delete_section(item: any):Observable<any>{
      return this._HttpClient.delete<any>(this.baseUrl +`storage-system/${item.id}`)
  }

  // getting offers for companies
  get_offer_companies ()
  {
    return this._HttpClient.get(this.baseUrl +  `all_Offer_Company`) ;
  }
  subscribeOffer(offer)
  {
    return this._HttpClient.post(this.baseUrl   + `Pivot-offer` , offer)
  }
}
