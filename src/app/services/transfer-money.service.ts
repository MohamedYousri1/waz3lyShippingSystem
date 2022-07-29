import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferMoneyService {
  private baseUrl :string  = 'https://waz3ly.net/dashboard/api/dashboard/';
  constructor(private _http : HttpClient  ) { }

  get_allTreasuries()
  {
    return this._http.get(this.baseUrl + `Treasurie`) ;
  }

  transferMoney(data :any )
  {
    return this._http.post(this.baseUrl + `transferring_treasury` , data)
  }

  getAllTransfered()
  {
    return this._http.get(this.baseUrl + `transferring_treasury`)
  }
}
