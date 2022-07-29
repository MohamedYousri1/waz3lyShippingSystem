import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseAndIncomesService {
  private baseUrl :string  = 'https://waz3ly.net/dashboard/api/dashboard';
  constructor(private _http : HttpClient) { }

  get_allIncomes()
  {
    return this._http.get(this.baseUrl + `/income`) ;
  }

  get_allExpenses()
  {
    return this._http.get(this.baseUrl + `/expense`) ;
  }
  addData(data :any )
  {
    return this._http.post(this.baseUrl + `/income_and_expense` , data)
  }

  get_allExpensesIncomes()
  {
    return this._http.get(this.baseUrl + `/income_and_expense`) ;
  }

  delete_data(data: any):Observable<any>{
    return this._http.delete<any>(this.baseUrl +`/income_and_expense/${data.id}` , data.id);
}

get_allExpensesDrop()
{
  return this._http.get(this.baseUrl + `/allexpense`) ;
}

get_allIncomesDrop()
{
  return this._http.get(this.baseUrl + `/allIncome`) ;
}

}
