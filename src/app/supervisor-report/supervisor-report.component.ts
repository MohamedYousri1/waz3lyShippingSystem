import { ReportsService } from './../services/reports.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisor-report',
  templateUrl: './supervisor-report.component.html',
  styleUrls: ['./supervisor-report.component.css']
})
export class SupervisorReportComponent implements OnInit {

    //pagination
    rows = 5;
    recourdNumber:number;
  constructor( private fb:FormBuilder  , private _supervisor : ReportsService ) { }

  ngOnInit(): void {
    this.get_allSupervisors()
  }

  // get  allSupervisors
  allSupervisors
  get_allSupervisors()
  {
    return this._supervisor.get_allSupervisors().subscribe(res =>  {
      this.allSupervisors = res ;
    })
  }

}
