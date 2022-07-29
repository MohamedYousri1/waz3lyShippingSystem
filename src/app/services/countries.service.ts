
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../shared/models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All(){
    return this._HttpClient.get<any>(this.baseUrl + `countries`)  ;
  }

  //add new
  add(data: any){
    return this._HttpClient.post<Country>(this.baseUrl + 'countries', data);
  }

  //edit
  edit(editData: any, jobId:number){
    return this._HttpClient.post<Country>(this.baseUrl + `countries/${jobId}?_method=PUT`, editData);
  }

   // delete
   delete_section(item: any):Observable<any>{
    return this._HttpClient.delete<any>(this.baseUrl +`countries/${item.id}`)
}

}

