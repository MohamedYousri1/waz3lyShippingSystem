import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepresentativesDetailsService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_allRepresentative(){
    return this._HttpClient.get<any>(`${this.baseUrl}all-representative`  , {headers : {skip : 'true'}})
  }

  // add_allRepresentative(data:any){
  //   return this._HttpClient.post<any>(`${this.baseUrl}employees` , data)
  // }





   //active
   active(obj){
    return this._HttpClient.post<any>(`${this.baseUrl}employees/${obj.id}/active`, obj)
  }

  //deactive
  de_active(obj){
    return this._HttpClient.post<any>(`${this.baseUrl}employees/${obj.id}/de_active`, obj)
  }


  saveAreaPrice(data : any )
  {
    return this._HttpClient.post(this.baseUrl + `representative-area` , data)
  }


  getAreaPrice()
  {
    return this._HttpClient.get(this.baseUrl + `representative-area` )
  }
  // add new
  // add_job(data: any){
  //   return this._HttpClient.post<any>(this.baseUrl + 'jobs', data);
  // }






  addRepresentative(id)
  {
    return this._HttpClient.get(`https://waz3ly.net/dashboard/api/dashboard/details_account_representative/${id}`)
  }


  afterZeroWallet(id)
  {
    return this._HttpClient.get(`https://waz3ly.net/dashboard/api/dashboard/account_detail_representative/${id}`)
  }

  clearWallet (data : any )
  {
    return this._HttpClient.post(`https://waz3ly.net/dashboard/api/dashboard/representative_account` , data)
  }






  // add new
  // add_job(data: any){
  //   return this._HttpClient.post<any>(this.baseUrl + 'jobs', data);
  // }

}
