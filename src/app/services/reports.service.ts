import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private base_url:string="https://waz3ly.net/dashboard/api/dashboard"
  constructor(private http:HttpClient) { }

  //get all
  get_allRepresentative(){
    return this.http.get<any>(`${this.base_url}/shipping_representatives`)
  }
  get_allCustomers()
  {
    return this.http.get(`https://waz3ly.net/dashboard/api/dashboard/user/individuals`) ;
  }
  getAllCompanies()
  {
    return this.http.get(`https://waz3ly.net/dashboard/api/dashboard/user/companies`) ;
  }
  sendDate(data)
  {
    return this.http.post(`https://waz3ly.net/dashboard/api/dashboard/statistics/getUserShipmentSNumberInterval` , data)
  }

  get_allSupervisors()
  {
    return this.http.get(`${this.base_url}/supervisors`)
  }

  get_all_emps()
  {
    return this.http.get(`${this.base_url}/employees`)
  }


  get_dailyBalance(data : any )
  {
   return  this.http.post(this.base_url + `/filter_income_and_expense` ,  data ) ;
  }

}
