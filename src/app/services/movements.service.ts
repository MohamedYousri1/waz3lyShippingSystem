import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MovementsService {
    private base_url:string="https://waz3ly.net/dashboard/api/dashboard"
    constructor(private http:HttpClient) { }

    //get all
    getAll(){
      return this.http.get<any>(`${this.base_url}/movements`)
    }

    //add
    add(data){
      return this.http.post<any>(`${this.base_url}/movements`, data)
    }

    //edit
    edit(data, id){
      return this.http.post<any>(`${this.base_url}/movements/${id}?_method=PUT`, data)
    }

    getClientfOnSales(sale_id)
    {
      return this.http.get(`${this.base_url}/sales/${sale_id}/getSalesClients`)
    }
    getMovement_client(client_id)
    {
      return this.http.get(`${this.base_url}/client/${client_id}/getMovements`)
    }
    // send_token(token)
    // {
    //   return this.http.post(`${this.base_url}/me` , {Headers})
    // }


// getLoggedInUser(auth_token): Observable<any> {
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${auth_token}`
//   })
//   return this.http.post(`${this.base_url}/me`, {headers: headers });
// }
}
