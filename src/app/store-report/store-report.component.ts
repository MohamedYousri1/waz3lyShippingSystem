import { StoreReportService } from './../services/store-report.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-report',
  templateUrl: './store-report.component.html',
  styleUrls: ['./store-report.component.css']
})
export class StoreReportComponent implements OnInit {

    //pagination
    rows = 5;
    recourdNumber:number;
  constructor( private fb:FormBuilder  , private _store:StoreReportService ) { }

  ngOnInit(): void {
    this.getAllClients()
  }

  // get all Clients
  allStores
  getAllClients()
  {
    // return this._client.getAll().subscribe(res =>  {
    //   this.allClients = res ;
    // })
  }
}
