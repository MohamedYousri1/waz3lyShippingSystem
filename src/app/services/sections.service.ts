import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sec } from '../shared/models/sec';

@Injectable({
  providedIn: 'root'
})

export class SectionsService {

  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';

  constructor(private _HttpClient:HttpClient) { }
    //get all
    get_sections  () :  Observable<any>{
      debugger
      return this._HttpClient.get<Sec>(this.baseUrl + `departments`)  ;
    }

    // add new
    add_sections(data: any){
      return this._HttpClient.post<Sec>(this.baseUrl + 'departments', data);
    }

    // update
    edit_section(editData: any, jobId: number): Observable<any> {
      return this._HttpClient.post<Sec>(this.baseUrl + `departments/${jobId}?_method=PUT`, editData);
    }

    // delete
    delete_section(item: any):Observable<any>{
        return this._HttpClient.delete<Sec>(this.baseUrl +`departments/${item.id}`)
    }
}
