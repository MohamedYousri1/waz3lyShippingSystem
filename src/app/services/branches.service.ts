import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_branchs(){
    return this._HttpClient.get<any>(this.baseUrl + `branches`)  ;
  }

  //add new
  add_branch(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'branches', data);
  }

  //edit
  edit_branch(editData: any, jobId:number){
    return this._HttpClient.post<any>(this.baseUrl + `branches/${jobId}?_method=PUT`, editData);
  }

  //get one barnch
  get_one_branch(id){
    return this._HttpClient.get<any>(`${this.baseUrl}branches/${id}`)
  }
     //active
     active(obj){
      return this._HttpClient.get<any>(`${this.baseUrl}activationBranch/${obj.id}`)
    }

      //get all
      get_activated_branchs(){
        return this._HttpClient.get<any>(this.baseUrl + `getActiveBranch`)  ;
      }

      delete_section(item: any):Observable<any>{
        return this._HttpClient.delete<any>(this.baseUrl +`branches/${item.id}`)
    }

}
