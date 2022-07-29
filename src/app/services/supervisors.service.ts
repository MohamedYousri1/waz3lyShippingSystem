import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupervisorsService {

  private base_url='https://waz3ly.net/dashboard/api/dashboard'
  constructor(private http:HttpClient) { }


  //get all
  get_supervisors(){
    return this.http.get<any>(`${this.base_url}/supervisors` , {headers : {skip : 'true'}})
  }
  get_emp_survisors(emp_id)
  {
    return this.http.get<any>(`${this.base_url}/supervisors/${emp_id}/getSupervisorShipmentRepresentatives`)
  }

  add_target(data , emp_id)
  {
    return this.http.post(`${this.base_url}/shipment_representative/${emp_id}/setEmployeeTarget` , data)
  }

  get_emps_rate(emp_id)
  {
    return this.http.get(`${this.base_url}/shipment_representative/${emp_id}/getEmployeeRate`)
  }
}
