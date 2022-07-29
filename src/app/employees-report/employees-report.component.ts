import { ReportsService } from './../services/reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees-report',
  templateUrl: './employees-report.component.html',
  styleUrls: ['./employees-report.component.css']
})
export class EmployeesReportComponent implements OnInit {

    //pagination
    rows = 5;
    recourdNumber:number;
  constructor( private _emp : ReportsService ) { }

  ngOnInit(): void {
    this.get_all_emps()
  }

  // get  allEmps
  allEmps
  get_all_emps()
  {
    return this._emp.get_all_emps().subscribe(res =>  {
      this.allEmps = res ;
    })
  }
}
