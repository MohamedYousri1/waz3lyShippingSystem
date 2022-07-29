import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl :string  = 'https://waz3ly.net/dashboard/api/dashboard';
  constructor(private _http : HttpClient) { }

  get_allExpense()
  {
    return this._http.get(this.baseUrl + `/expense`) ;
  }
  get_mainExpense()
  {
    return this._http.get(this.baseUrl + `/mainExpense`) ;
  }
  adding_expense(data  :any )
  {
    return this._http.post(this.baseUrl + `/expense` , data )
  }
  edit_expense(data : any  , expense_id :any )
  {
    return this._http.post(this.baseUrl + `/expense/${expense_id}?_method=PUT` , data)
  }
  delete_teasury(id : any ){
    return this._http.delete<any>(this.baseUrl +`/expense/${id}` , id);
}



}
