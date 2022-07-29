import { ShipmentsCompanyService } from './../services/shipments-company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sending-shipments',
  templateUrl: './sending-shipments.component.html',
  styleUrls: ['./sending-shipments.component.css']
})
export class SendingShipmentsComponent implements OnInit {

  constructor(
    private  _shipmentsCompany : ShipmentsCompanyService
  ) { }

  ngOnInit(): void {
    this.get_nowShipments(`https://waz3ly.net/dashboard/api/dashboard/shipment-send`) ;
  }


  allData   : any ;
  get_nowShipments(pageNumber)
  {
    debugger
    this._shipmentsCompany.get_sendingShipments(pageNumber).subscribe((res : any ) => {
      debugger
      console.log(res);

      this.allData = res.shipment_sent?.data ;
      console.log(this.allData);
      this.filteredData = res.shipment_sent?.data ;
      this.pageAfter = res.shipment_sent?.next_page_url ;
      this.pageBefore = res.shipment_sent?.prev_page_url ;
      this.pageLast = res.shipment_sent?.last_page_url ;
      this.pageFirst = res.shipment_sent?.first_page_url ;
    },err=>  {
    })
  }
  //
  first: number = 0;
  totalRecords: number = 1;
  totalRecords2: number = 1;
  onPageChange(event) {
    debugger
      this.first = event.first;
      this.get_nowShipments(this.first) ;
  }


  geeks: any ;
  gfg: number = 3;

  chan() {
    this.gfg += 1;
  }
  bolisaNumber : any  ;
  fromDate :  any ;
  toDate :  any ;
  filteredData  : any[] = [] ;
  index1 : number = 0 ;
  index2 : number = 0 ;
  index3 : number = 1 ;
  index4 : number = 1 ;
  index5 : number = 2 ;
  index6 : number = 3 ;
  index7 : number = 4 ;
  index8 : number = 4 ;
  index9 : number = 4 ;
  index10: number  = 4;
  index11: number  = 4;

  searchingFun()
  {
    debugger
      this._shipmentsCompany.filterDataSend({start_date : this.fromDate , end_date :  this.toDate  , number_id :  this.bolisaNumber}).subscribe((res : any ) => {
        debugger
        this.filteredData = [] ;
        this.filteredData[0] = res.search_date ;
      this.totalRecords2 = this.filteredData.length
      },err=>  {
        console.log(err);
        this.filteredData = [] ;
        this.totalRecords2 = 1
      })
  }

  refresh() {
    this.get_nowShipments('https://waz3ly.net/dashboard/api/dashboard/shipment-send') ;
  }
  pageAfter : any ;
  pageBefore : any ;
  pageLast : any ;
  pageFirst  : any ;

  nextPage()
  {
    debugger
    this.get_nowShipments(this.pageAfter) ;
  }
  firstPage()
  {
    debugger
    this.get_nowShipments(this.pageFirst) ;
  }
  lastPage()
  {
    debugger
    this.get_nowShipments(this.pageLast) ;
  }

  previusPage()
  {
    debugger
    this.get_nowShipments(this.pageBefore) ;
  }


}
