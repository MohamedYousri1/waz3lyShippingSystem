import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupervisorsService } from './../supervisors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emps-supervisor',
  templateUrl: './emps-supervisor.component.html',
  styleUrls: ['./emps-supervisor.component.css']
})
export class EmpsSupervisorComponent implements OnInit {
  catch_id:any
  allEmps:any[]=[]

  //catch name from ser
  storage_name:any
  myForm : FormGroup ;


  //pagination
  rows = 5;
  recourdNumber:number;
  constructor(
                      private _emps_serv:SupervisorsService,
                      private modal:NgbModal,
                      private toaster:ToastrService,
                      private fb:FormBuilder,
              private rout:ActivatedRoute) { }


  ngOnInit(): void {


    this.rout.params.subscribe(
      res=>{
        this.catch_id=res.id
      }
    )
    this.get_emp_survisors(this.catch_id) ;
    this.myForm=this.fb.group({
      from:[null, Validators.required] ,
      to:[null, Validators.required] ,
    })

  }



addTarget()
{
  
  return this._emps_serv.add_target(this.myForm.value , this.emp_id ).subscribe(res => {
    console.log(res);
    this.modal.dismissAll() ;
    this.get_emp_survisors(this.emp_id)
  })
}


  ship_id
  storage_id

 //get one shipment
 get_emp_survisors(id){
   
  this._emps_serv.get_emp_survisors(id).subscribe(
    res=>{
      this.allEmps=res
    
    }
  )
}
// get the rate of emps
rates ;
get_emps_rate(emp_id)
{
  return this._emps_serv.get_emps_rate(emp_id).subscribe(res =>  {
    this.rates = res ;
  })
}

emp_id
add_edit(modal,obj){
  
  this.emp_id = obj.id
  this.storage_id = obj.storage_id
  this.modal.open(modal,{ size: 'lg' }) //, backdrop: 'static'
  this.get_emps_rate(obj.id) ;
  console.log(this.rates);

}



}
