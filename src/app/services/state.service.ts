import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private base_url='https://waz3ly.net/dashboard/api/dashboard'
  constructor(private http:HttpClient) { }


  //get all
  getAll(){
    return this.http.get<any>(`${this.base_url}/states`)
  }

  //add
  add(data){
    return this.http.post<any>(`${this.base_url}/states`, data)
  }

  //edit
  edit(data, id){
    return this.http.post<any>(`${this.base_url}/states/${id}?_method=PUT`, data)
  }

   // delete
   delete_section(item: any):Observable<any>{
    return this.http.delete<any>(this.base_url +`/states/${item.id}`)
}
}
