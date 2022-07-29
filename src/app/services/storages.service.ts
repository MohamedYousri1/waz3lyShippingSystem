import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StoragesService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All(){
    return this._HttpClient.get<any>(this.baseUrl + `store`)  ;
  }

  //add new
  add(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'store', data);
  }

  //edit
  edit(editData: any, jobId:number){
    return this._HttpClient.post<any>(this.baseUrl + `store/${jobId}?_method=PUT`, editData);
  }

  //get branch storage
  get_storage(id){
    return this._HttpClient.get<any>(`${this.baseUrl}branches/${id}/store`)
  }

   //get one branch to show it
   get_one_storage(id){
    return this._HttpClient.get<any>(`${this.baseUrl}store/${id}`)
  }
  //get storage shipments
    get_shipments(id){
      return this._HttpClient.get<any>(`${this.baseUrl}store/${id}/getShipments`)
   }

   get_products(id)
   {
    return this._HttpClient.get<any>(`${this.baseUrl}store/${id}/getProducts`)
   }


   delete_section(item: any):Observable<any>{
    return this._HttpClient.delete<any>(this.baseUrl +`store/${item.id}`)
}


}
