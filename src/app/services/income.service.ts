import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private baseUrl :string  = 'https://waz3ly.net/dashboard/api/dashboard';
  constructor(private _http : HttpClient) { }

  get_allIncomes()
  {
    return this._http.get(this.baseUrl + `/income`) ;
  }
  get_mainIncomes()
  {
    return this._http.get(this.baseUrl + `/mainIncome`) ;
  }
  adding_income(data  :any )
  {
    return this._http.post(this.baseUrl + `/income` , data )
  }
  edit_income(data : any  , income_id :any )
  {
    return this._http.post(this.baseUrl + `/income/${income_id}?_method=PUT` , data)
  }
  delete_teasury(id : any ){
    return this._http.delete<any>(this.baseUrl +`/income/${id}` , id);
}
}
