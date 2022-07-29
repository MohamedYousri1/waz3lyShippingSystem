import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsCompanyService {

    private base_url:string= "https://waz3ly.net/dashboard/api/dashboard"
    constructor(private http:HttpClient) { }

    //get all
    getAll(isFirst : boolean   , pageLink :  any , data ){

      if(isFirst == true )
      {
      return this.http.post<any>(`${this.base_url}/all-shipment` , data)
      }else
      {
      return this.http.post<any>(`${pageLink}` , data )
      }
    }

    // getAll(){
    //   return this.http.get<any>(`${this.base_url}/all-shipment` , {headers : {skip : 'true'}})
    // }
    getAllShipmentsForcompany(isFirst : boolean   , pageLink :  any){
      if(isFirst == true )
      {
      return this.http.get<any>(`${this.base_url}/all-shipment-company`)
      }else
      {
      return this.http.get<any>(`${pageLink}`)
      }
    }

    //add data
    add(data:any){
      return this.http.post <any>(`${this.base_url}/create-shipment`, data)
    }

    create_shipmentCom(data:any)
    {
      return this.http.post <any>(`${this.base_url}/create-shipment-company`, data)
    }
    edit_shipment(data:any , id : any ){
      return this.http.post <any>(`${this.base_url}/update-shipment/${id}`, data)
    }

    edit_shipmentCompany(data:any , id : any ){
      return this.http.post <any>(`${this.base_url}/update-shipment-company/${id}`, data)
    }
    checkReciever(data)
    {
      return this.http.post <any>(`${this.base_url}/users/check`, data)
    }
    addReceiver(data)
    {
      return this.http.post <any>(`${this.base_url}/receiverRegister`, data)
    }
    getAllShipments(user_id)
    {
      return this.http.get(`${this.base_url}/shipments/user/angular/${user_id}` , {headers : {skip : 'true'}})
    }
        // delete
        delete_shipment(item: any){
          return this.http.post<any>(this.base_url +`/shipments/register/angular/delete/${item.id}?_method=DELETE` , item.id)
      }

            // ====> get All Shipment Companies
    get_companiesShipment()
    {
      return this.http.get(this.base_url + `/user/companies` , {headers : {skip : 'true'}}) ;
    }


    get_shipmentStatus()
    {
      return this.http.get(this.base_url + `/shipment_status`)
    }

    // getting the shipments of the now running
    get_runningShipments(url : any)
    {
      debugger
      return this.http.get(url);
    }
       // getting the shipments of the sending

    get_sendingShipments(pageNumber )
    {
      debugger
      return this.http.get(pageNumber);
    }

    // getting the shipments of the finished Shipments
    get_finishedShipments(pageNumber)
    {
      return this.http.get(pageNumber);
    }

    filterDataRunning(data : any )
    {
      return this.http.post(this.base_url + `/search_date_current` , data )
    }

    filterDataSend(data : any )
    {
      return this.http.post(this.base_url + `/search_date_sent` , data )
    }

    filterDataFinished(data : any )
    {
      return this.http.post(this.base_url + `/search_date_finished` , data )
    }
}

