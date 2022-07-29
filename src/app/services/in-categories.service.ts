import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InCategoriesService {

  private baseUrl:string='https://waz3ly.net/dashboard/api/dashboard'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/revenues`)
  }

  add(data){
    return this.http.post<any>(`${this.baseUrl}/revenues`, data)
  }

  edit(data, id){
    return this.http.post<any>(`${this.baseUrl}/revenues/${id}?_method=PUT`, data)
  }

      // delete
      delete_section(item: any):Observable<any>{
        return this.http.delete<any>(this.baseUrl +`/revenues/${item.id}`)
    }


  //get child
  getChildes(id){
    return this.http.get<any>(`${this.baseUrl}/revenues/${id}/getChildes`)
  }

}


