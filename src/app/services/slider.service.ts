import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private base_url='https://waz3ly.net/dashboard/api/dashboard'
  constructor(private http:HttpClient) { }


  //get all
  getAll(){
    return this.http.get<any>(`${this.base_url}/advertisement`)
  }

  //add
  add(data){
    return this.http.post<any>(`${this.base_url}/advertisement`, data)
  }

  //edit
  edit(data, id){
    return this.http.post<any>(`${this.base_url}/advertisement/${id}?_method=PUT`, data)
  }
      // delete
      delete(item: any){
        return this.http.post<any>(this.base_url +`/advertisement/${item.id}?_method=DELETE` , item.id)
    }
}
