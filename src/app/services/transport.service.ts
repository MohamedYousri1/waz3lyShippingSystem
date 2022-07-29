
  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
  import { Trans } from '../shared/models/trans';

  @Injectable({
    providedIn: 'root'
  })
  export class TransportService {

    private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/'
    constructor(private _HttpClient:HttpClient) { }

    //get all
    get_All(){
      return this._HttpClient.get<any>(this.baseUrl + `transport_type`)  ;
    }

    // add new
    add(data: any){
      return this._HttpClient.post<Trans>(this.baseUrl + 'transport_type', data);
    }

    // update
    edit(editData: any, jobId:number){
      return this._HttpClient.post<Trans>(this.baseUrl + `transport_type/${jobId}?_method=PUT`, editData);
    }

    //get one
    getOne(id){
      return this._HttpClient.get<any>(this.baseUrl +`transport_type/${id}`)
    }
    // delete
    delete_section(item: any):Observable<any>{
      return this._HttpClient.delete<any>(this.baseUrl +`transport_type/${item.id}`)
  }


  }
