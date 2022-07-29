import { ShipmentsCompanyService } from './../services/shipments-company.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-myshipments',
  templateUrl: './myshipments.component.html',
  styleUrls: ['./myshipments.component.css']
})
export class MyshipmentsComponent implements OnInit {

  constructor(
    private  _shipmentsCompany : ShipmentsCompanyService
  ) { }

  ngOnInit(): void {
    this.get_nowShipments(`https://waz3ly.net/dashboard/api/dashboard/shipment-current`) ;
  }


  allData   : any ;

  get_nowShipments(url : any )
  {
    debugger
    this._shipmentsCompany.get_runningShipments(url).subscribe((res : any ) => {
      debugger
      console.log(res);
      this.allData = res.shipment_current?.data ;
      console.log(this.allData);
      this.filteredData = res.shipment_current?.data ;
      this.pageAfter = res.shipment_current?.next_page_url ;
      this.pageBefore = res.shipment_current?.prev_page_url ;
      this.pageLast = res.shipment_current?.last_page_url ;
      this.pageFirst = res.first_page_url ;
    },err=>  {
      console.log(err);

    })
  }
  //
  first: number = 0;
  geeks: any ;
  gfg: number = 3;

  chan() {
    this.gfg += 1;
  }
  bolisaNumber : any  = null  ;
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
      this._shipmentsCompany.filterDataRunning({start_date : this.fromDate , end_date :  this.toDate  , number_id :  this.bolisaNumber}).subscribe((res : any ) => {
        debugger
        this.filteredData = [] ;
        this.filteredData[0] = res.search_date ;
      },err=>  {
        console.log(err);
        this.filteredData = [];
      })
  }
  //Editing  ;
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

