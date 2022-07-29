import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private baseUrl: string = 'https://waz3ly.net/dashboard/api/dashboard/l';
  constructor(private _HttpClient:HttpClient) { }

  //get all
  get_total_in_out(){
    return this._HttpClient.get<any>(this.baseUrl + `statistics/getTotalInOut`)  ;
  }
  // get all Categories Ins
  getCategoriesIns()
  {
    return this._HttpClient.get(this.baseUrl + `statistics/getCategoriesIns`);
  }
  getIn()
  {
    return this._HttpClient.get(this.baseUrl + `statistics/dailyMonthlyYearlyIns`);
  }

  getOut()
  {
    return this._HttpClient.get(this.baseUrl + `statistics/dailyMonthlyYearlyOuts`);
  }
    // get all Categories Out
    getCategoriesOuts()
    {
      return this._HttpClient.get(this.baseUrl + `statistics/getCategoriesOuts`);
    }

        // add Date To get The Total
   //add new
   add_profit(data: any){
    return this._HttpClient.post<any>(this.baseUrl + 'statistics/getIntervalOut', data);
  }
  //اجمالي المصروفات
  // addAllOuts(data)
  // {
  //   return this._HttpClient.post(this.baseUrl + 'statistics/getIntervalOut' , data)
  // }




}
