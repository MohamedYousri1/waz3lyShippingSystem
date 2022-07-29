
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/shared/models/area';
import { TargetsService } from 'src/app/services/targets.service';
import { Target } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-show-target',
  templateUrl: './show-target.component.html',
  styleUrls: ['./show-target.component.css']
})
export class ShowTargetComponent implements OnInit {
  emp_amount:number
  main_amount:number
  auto_division:number
  //For Get Data And Displed In DataTable
  target_List: any[]=[];
  employee_target_list:any[]=[]
  selectedMembers :any;
  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:Area


  catch_id:any

  constructor(private target_ser:TargetsService, private employes_ser:EmployeeService, private fb:FormBuilder, private modal:NgbModal, private toaster:ToastrService) {}
  ngOnInit(): void {
    this.getAll()
    this.get_employees()
    // this.get_one

  }

  //get one
  get_one(ET_modal, id){
    // debugger
    this.catch_id=id
    this.build()
    this.modal.open(ET_modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.target_ser.get_one(id).subscribe(
      res=>{
        console.log(res);
        this.main_amount=res.amount
        this.auto_division=res.auto_division
        this.employee_target_list=res.target_units;
      }
    )
  }


  //get all
  getAll(){
    this.target_ser.get_All().subscribe(
      res=>{
        this.target_List=res
        this.selectedMembers = this.target_List
      }
    )
  }

  //add_edit button
  add_edit(modal,obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  update(updateitmes:any){
    this.target_List=updateitmes;
    this.modal.dismissAll()
  }


  clear(table: Table) {
    table.clear();
  }





  //////////////////////////////////////////////////form here

  myform!:FormGroup
  submited:boolean=false
  employees:any[]=[]

  get_employees(){
    this.employes_ser.employ().subscribe(
      res=>{
        this.employees=res
      }
    )
  }

  //build
  build(){
    console.log("catch id ");
    console.log(this.catch_id);
    this.myform=this.fb.group({
      employee_id:[null, Validators.required],
      target_id:this.catch_id,
      money:'',
    })
  }
  //for form errors
  get f() {return this.myform.controls}

  //submit form
    onsubmit(id:any){
      this.submited=true
     // if(this.myform.invalid){
      //  return
    //  }
    this.add(this.myform.value)

      if(id === ""){
      }else{
        //this.edit(this.myform.value, id)
      }
    }

  //add function
  formDataToSend = new FormData() ;
  t1 ;
  t2 ;
  add(data){

    this.t1 = (this.main_amount / this.main_amount) * 100 ;
    this.t2 = (this.emp_amount / this.main_amount) * 100 ;

    if(this.auto_division == 0)
    {
      if(this.emp_amount >= this.main_amount)
      {
        this.formDataToSend.append('percentage' , this.t1 )
      }else
      {
        this.formDataToSend.append('percentage' , this.t2)
      }
      this.formDataToSend.append('employee_id' , this.myform.controls.employee_id.value) ;
      this.formDataToSend.append('target_id' , this.catch_id) ;
      this.formDataToSend.append('money' , this.myform.controls.money.value) ;
    }else{
      this.formDataToSend.delete('money') ;
      this.formDataToSend.delete('percentage') ;
      this.formDataToSend.append('employee_id' , this.myform.controls.employee_id.value) ;
      this.formDataToSend.append('target_id' , this.catch_id) ;
    }

    this.target_ser.post_emp(this.formDataToSend).subscribe(
      res=>{
        console.log(res);
        this.toaster.success('تم الاضافة  بنجاح')
        this.after_up(this.catch_id)
        this.myform.reset()
        this.modal.dismissAll() ;
      },err=>{
        console.log(err);
        if(err){
          if(err?.error == 'هذا الموظف موجود بالفعل في هذا الهدف'){
            this.toaster.error('هذا الموظف موجود بالفعل في هذا الهدف')
          }else if(err?.error == 'النسبة المدخلة اكبر من النسبة المتاحه')
          {
            this.toaster.error('النسبة المدخلة اكبر من النسبة المتاحه')
          }
        }
      }
    )
  }

  after_up(id){
    this.target_ser.get_one(id).subscribe(
      res=>{
        this.employee_target_list=res.target_units;
      }
    )
  }



  getDate(start: Date, end: Date) {
    start = new Date(start)
    end = new Date(end);
      this.selectedMembers = this.target_List.filter(m => {
        // m.from = new Date(m.from);
        // m.to = new Date(m.to);
        if (( new Date(m.from) > start &&  new Date(m.from) < end) || (new Date(m.to) > start && new Date(m.to) < end)) {
          return m ;
        } 
         
      }
      );
  
    }

}


