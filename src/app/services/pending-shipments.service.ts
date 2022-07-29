import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PendingShipmentsService {
  private base_url:string= "https://waz3ly.net/dashboard/api/dashboard"
  constructor(private http:HttpClient) { }

  //get all
  getPending(){
    return this.http.get<any>(`${this.base_url}/shipment/getPendingShipments`)
  }

  getBranches()
  {
    return this.http.get(`${this.base_url}/branches`)
  }

  getstorage(id)
  {
    return this.http.get<any>(`${this.base_url}/branches/${id}/storages`)
  }
  addData(data , id) : Observable<any>
  {
    return this.http.post(`${this.base_url}/shipment/${id}/assignShipmentStorageBranch` , data)
  }

}
