import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  private base_url:string= "https://waz3ly.net/dashboard/api/dashboard"
  constructor(private http:HttpClient) { }
  //get all
  getAll(isFirst : boolean   , pageLink :  any ,data ){

    if(isFirst == true )
    {
      debugger
    return this.http.get<any>(`${this.base_url}/all-shipment?start_date=${data.start_date}&end_date=${data.end_date}&representative_id=${data.representative_id}&shipment_status_id=${data.shipment_status_id}&date=${data.date}&search=${data.search}`)
    }else
    {
    return this.http.get<any>(`${pageLink}&start_date=${data.start_date}&end_date=${data.end_date}&representative_id=${data.representative_id}&shipment_status_id=${data.shipment_status_id}&date=${data.date}&search=${data.search}` )
    }
  }

  //add data
  add(data:any){
    return this.http.post <any>(`${this.base_url}/create-shipment`, data)
  }

  //edit
  edit(data:any, id:any){
    return this.http.post <any>(`${this.base_url}/update-shipment/${id}`, data)
  }

  //get one
  get_one(id){
    return this.http.post<any>(`${this.base_url}/show-shipment/${id}` , {})
  }

  //get products in this shipment
  get_shipment(id){
    return this.http.get<any>(`${this.base_url}/shipments/${id}/products`)
  }

  getRevresentative(storage_id)
  {
    return this.http.get(`${this.base_url}/storage/${storage_id}/getStorageEmployees`)
  }

  addRepresentative(data , id)
  {
    return this.http.post(`${this.base_url}/shipment/${id}/approve` , data)
  }

  get_backshipment(){
    return this.http.get<any>(`${this.base_url}/shipments/employee/pack`)
  }

  addRepresentativeOnBack(data , id)
  {
    return this.http.post(`${this.base_url}/shipment/${id}/approve/pack` , data)
  }

  UploadExcel(exelData : any )
  {
    return  this.http.post(this.base_url + `/shipments` , exelData)
  }


changeShipment(data )
{
  return this.http.post <any>(`${this.base_url}/changeShipmentsStatus`, data)
}

refusalStatuses():Observable<any>
{
  return this.http.get <any>(`${this.base_url}/refusal_statuses`)
}


uploadFile(data   : any )
{
  return this.http.post(this.base_url + `/import-shipment/1`, data ) ;
}

deleteItem(item: any):Observable<any>{
  return this.http.delete<any>(this.base_url +`/destroy-shipment/${item.id}`)
}

get_allForCompany(isFirst : boolean   , pageLink :  any)
{
  if(isFirst == true )
      {
      return this.http.get<any>(`${this.base_url}/all-shipment-company`)
      }else
      {
      return this.http.get<any>(`${pageLink}`)
      }}
addingResToShipment(data  : any )
{
  return this.http.post(this.base_url +  `/update-shipment_representatives`  , data)
}

gettingShipmentForRes(representative_id :any)
{
  return this.http.get(this.base_url +  `/edit_representative/${representative_id}`)
}

filterAll(data : any )
{
  debugger
  return this.http.get(this.base_url + `/all-shipment?start_date=${data.start_date}&end_date=${data.end_date}&representative_id=${data.representative_id}&shipment_status_id=${data.shipment_status_id}&date=${data.date}&search=${data.search}`)
}
}


