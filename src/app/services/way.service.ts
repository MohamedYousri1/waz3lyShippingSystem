import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Way } from '../shared/models/way';

@Injectable({
  providedIn: 'root'
})
export class WayService {

  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All ():Observable<any>{
    return this._HttpClient.get<Way>(this.baseUrl + `ways`)  ;
  }

  // add new
  add(data: any){
    return this._HttpClient.post<Way>(this.baseUrl + 'ways', data);
  }

  // update
  edit(editData: any, jobId:number){
    return this._HttpClient.post<Way>(this.baseUrl + `ways/${jobId}?_method=PUT`, editData);
  }

  //get one
  getOne(id){
    return this._HttpClient.get<Way>(this.baseUrl +`ways/${id}`)
  }

}
