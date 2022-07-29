import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreasuryInService {
  private baseUrl :string  = 'https://waz3ly.net/dashboard/api/dashboard';
  constructor(private _http : HttpClient) { }

  getAllData(treasury_id :any )
  {
    return this._http.get(this.baseUrl + `/income_and/${treasury_id}`)
  }
    getAllDataOut(treasury_id :any )
  {
    return this._http.get(this.baseUrl + `/expense_and/${treasury_id}`)
  }


  get_allTreasuries()
  {
    return this._http.get(this.baseUrl + `/Treasurie`) ;
  }

  payment(data :any)
  {
    return this._http.post(this.baseUrl + `/treasuryTransactionIn` , data )
  }

   // cancel Payment Function
   cancelPayment(rowData :any )
   {
     return this._http.post(this.baseUrl + `/treasuryTransactionIn/${rowData.id}?_method=PUT` , {treasury_id : rowData.treasury_id , amount  :rowData.amount , type  :rowData.type_res} )
   }

}
