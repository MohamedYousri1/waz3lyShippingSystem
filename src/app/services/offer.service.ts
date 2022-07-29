import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_offers  () :  Observable<any>{
    return this._HttpClient.get<any>(this.baseUrl + `offer`)  ;
  }

  // add new
  add_offer(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'offer', data);
  }

  // update
  edit_offer(editData: any, offerId: number): Observable<any> {
    return this._HttpClient.post<any>(this.baseUrl + `offer/${offerId}?_method=PUT`, editData);
  }

    // delete
    delete_section(item: any):Observable<any>{
      return this._HttpClient.delete<any>(this.baseUrl +`offer/${item.id}`)
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



  get_offer_storage_companies ()
  {
    return this._HttpClient.get(this.baseUrl +  `all_Storage_system_Company`) ;
  }
  subscribeOfferStorage(offer)
  {
    return this._HttpClient.post(this.baseUrl   + `Pivot-storage-system` , offer)
  }
}
