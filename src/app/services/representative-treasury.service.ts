import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepresentativeTreasuryService {

  private base_url:string="https://waz3ly.net/dashboard/api/dashboard"
  constructor(private http:HttpClient) { }

  //get all
  get_allData(data){
    debugger
    if(data.from_date == null ||  data.to_date== null )
    {
      return this.http.get<any>(`${this.base_url}/representative_expense_filter`)
    }else
    {
      return this.http.get<any>(`${this.base_url}/representative_expense_filter?start_date=${data.from_date}&end_date=${data.to_date}`)
    }
  }

  paidMoney(data  : any  )
  {
    return this.http.post(this.base_url + `/representative_expense`  , data )
  }
}
