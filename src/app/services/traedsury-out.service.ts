import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraedsuryOutService {
  private baseUrl :string  = 'https://waz3ly.net/dashboard/api/dashboard';
  constructor(private _http : HttpClient) { }

  getAllData(treasury_id :any )
  {
    return this._http.get(this.baseUrl + `/and_expense/${treasury_id}`)
  }

  get_allTreasuries()
  {
    return this._http.get(this.baseUrl + `/Treasurie`) ;
  }

  payment(data :any)
  {
    return this._http.post(this.baseUrl + `/treasuryTransactionOut` , data )
  }

  // cancel Payment Function
  cancelPayment(rowData :any )
  {
    return this._http.post(this.baseUrl + `/treasuryTransactionOut/${rowData.id}?_method=PUT` , {treasury_id : rowData.treasury_id , amount  :rowData.amount , type  :rowData.type_res} )
  }

}
