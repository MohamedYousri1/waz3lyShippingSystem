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
  constructor( private fb:FormBuilder  , private _client : ReportsService ) { }

  ngOnInit(): void {
    this.getAllClients()
  }

  // get  allRepresentative
  allRepresentative
  getAllClients()
  {
    return this._client.get_allRepresentative().subscribe(res =>  {
      this.allRepresentative = res ;
    })
  }

}
