import { ReportsService } from './../services/reports.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-rec-report',
  templateUrl: './customers-rec-report.component.html',
  styleUrls: ['./customers-rec-report.component.css']
})
export class CustomersRecReportComponent implements OnInit {
  //pagination
  rows = 5;
  recourdNumber:number;
constructor( private fb:FormBuilder  , private _customerRec : ReportsService ) { }

ngOnInit(): void {
  this.getAllClients()
  this.build() ;
}

// get  allCustomers
allCustomers;
allCompanies;
getAllClients()
{
  return this._customerRec.get_allCustomers().subscribe(res =>  {
    this.allCustomers = res ;
  })
}
getAllCompanies()
{
  return this._customerRec.getAllCompanies().subscribe(res =>  {
    this.allCompanies = res ;
  })
}



myform:FormGroup
submited:boolean=false
id:any

build(){
  this.myform=this.fb.group({
    start:[null, Validators.required] ,
    end:[null, Validators.required] ,
    is_company : [false]

  })
}
get f() {return this.myform.controls}


onsubmit(id){
  this.submited=true
  if(this.myform.invalid){
    return;
  }else
  {
    this.add(this.myform.value)
  }

}
  totalShipments  ;
  //add funciton
  add(data){
    debugger
    debugger
    this._customerRec.sendDate(data).subscribe(
      res=>{
        this.totalShipments  = res  ;
        console.log(res);

      }
    )
  }
}
