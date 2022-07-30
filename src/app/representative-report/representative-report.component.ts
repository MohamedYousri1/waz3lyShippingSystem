import { ReportsService } from './../services/reports.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-representative-report',
  templateUrl: './representative-report.component.html',
  styleUrls: ['./representative-report.component.css']
})
export class RepresentativeReportComponent implements OnInit {

    //pagination
    rows = 5;
    recourdNumber:number;
    representative_id : any ;
  constructor( private fb:FormBuilder  , private _representative : ReportsService ) { }

  ngOnInit(): void {
    this.getAllRepresentative()
  }

  // get  allRepresentative
  allRepresentatives
  getAllRepresentative()
  {
    return this._representative.get_allRepresentative().subscribe(res =>  {
      this.allRepresentatives = res.representative ;
    })
  }

  // showing Shipments
  results ;
  showResult()
  {
    debugger
    this._representative.getShipments(2).subscribe((res : any ) =>  {
      this.results  = res.data?.shipment ;
    },err=> {
      console.log(err);

    })
  }

}
