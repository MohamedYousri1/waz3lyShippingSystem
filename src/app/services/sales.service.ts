import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private base_url='https://waz3ly.net/dashboard/api/dashboard'
  constructor(private http:HttpClient) { }


  //get all
  get_sales(){
    return this.http.get<any>(`${this.base_url}/sales`)
  }

  get_client_sale(sale_id)
  {
    return this.http.get<any>(`${this.base_url}/sales/${sale_id}/getSalesClients`)
  }
  get_client_movements(client_id)
  {
    return this.http.get(`${this.base_url}/client/${client_id}/getMovements`)
  }
  sendData(data)
  {
    return this.http.post(`${this.base_url}/movements` , data)
  }


}
