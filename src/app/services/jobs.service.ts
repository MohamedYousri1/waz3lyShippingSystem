import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJob } from '../shared/Jobs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_Jobs  () :  Observable<any>{
    return this._HttpClient.get<any>(this.baseUrl + `jobs`)  ;
  }


  // add new
  add_job(data: any){
    return this._HttpClient.post(this.baseUrl + 'jobs', data );
  }

  // update
  edit_job(editData: any, jobId: number): Observable<any> {
    return this._HttpClient.post<any>(this.baseUrl + `jobs/${jobId}?_method=PUT`, editData);
  }

    // delete
    delete_section(item: any):Observable<any>{
      return this._HttpClient.delete<any>(this.baseUrl +`jobs/${item.id}`)
  }
}
