import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inter } from '../shared/models/inter';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_All ():Observable<any>{
    return this._HttpClient.get<Inter>(this.baseUrl + `interest_levels`)  ;
  }

  // add new
  add(data: any){
    return this._HttpClient.post<Inter>(this.baseUrl + 'interest_levels', data);
  }

  // update
  edit(editData: any, jobId: number): Observable<any> {
    return this._HttpClient.post<Inter>(this.baseUrl + `interest_levels/${jobId}?_method=PUT`, editData);
  }

  // delete
  delete(id: any):Observable<any>{
    return this._HttpClient.delete<Inter>(this.baseUrl +`interest_levels/${id}`)
  }

  getOne(id){
    return this._HttpClient.get<Inter>(this.baseUrl +`interest_levels/${id}`)
  }
}
