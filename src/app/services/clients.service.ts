import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private base_url:string="https://waz3ly.net/dashboard/api/dashboard"
  constructor(private http:HttpClient) { }

  //get all
  getAll(){
    return this.http.get<any>(`${this.base_url}/clients`)
  }

  //post
  add(data){
    return this.http.post<any>(`${this.base_url}/clients`, data)
  }

  //edit
  edit(data,id){
    return this.http.post<any>(`${this.base_url}/clients/${id}?_method=PUT`, data)
  }
  turnClient(client_id , data) : Observable<any>
  {
    return this.http.post(`${this.base_url}/client/${client_id}/transformUser` , data)
  }

  getUSers()
  {
    return this.http.get(`${this.base_url}/users`)
  }

  getCompanies()
  {
    return this.http.get(this.base_url +  `/all-company`)  ;
  }

  // get All Compapnies
  getAllCompanies(){
    return this.http.get<any>(`${this.base_url}/all-company`)
  }
  add_company(data){
    return this.http.post<any>(`${this.base_url}/create-company`, data)
  }

  // edit_company(data,id){
  //   return this.http.post<any>(`${this.base_url}/users/signUpCompany/${id}?_method=PUT`, data)
  // }
  changePass(data){
    return this.http.post<any>(`${this.base_url}/change-Password-user-profile`, data)

  }

  // https://localhost/waz3ly/api/changePassword?_method=PUT

  edit_company(data,id){
    return this.http.post<any>(`${this.base_url}/update-company/${id}`, data)
  }




 //active
 active(obj){
  return this.http.post<any>(`${this.base_url}/active-user/${obj.user?.id}`, obj.user?.id)
}

//deactive
de_active(obj){
  return this.http.post<any>(`${this.base_url}/no-active-user/${obj.user?.id}`, obj.user?.id)
}

//  getting The Weight of Specific Company
get_company_weight(company_id  : any )
{
  return this.http.get(this.base_url + `/all-weight-company/${company_id}`)
}

// adding or updating The Existing weight
add_weightCompany(data : any)
{
  return this.http.post<any>(`${this.base_url}/weight-company`, data)
}
// getting global weight
get_globalWeight()
{
  return this.http.get(this.base_url + `/weight`)
}
// adding and updating the weight of company
updateWeight(data  : any )
{
  return this.http.post(this.base_url + `/weight` , data )
}
// getting areas for companies
get_areasCompany(company_id : any )
{
  return this.http.get(this.base_url + `all-company-area/${company_id}`)
}
// adding The Areas to Company
addingAreas(data)
{
return this.http.post(this.base_url + `/company-area` , data )
}

delete_section(item: any):Observable<any>{
  return this.http.delete<any>(this.base_url +`/company-area/${item.id}`)
}
editAreas(data,area_id : any ){
  return this.http.post<any>(`${this.base_url}/company-area/${area_id}?_method=PUT`, data)
}





addCompanyWall(id)
{
  return this.http.get(`https://waz3ly.net/dashboard/api/dashboard/company_detail/${id}`)
}


afterZeroWallet(id)
{
  return this.http.get(`https://waz3ly.net/dashboard/api/dashboard/account_detail/${id}`)
}

clearWallet (data : any )
{
  return this.http.post(`https://waz3ly.net/dashboard/api/dashboard/company-account` , data)
}


}
