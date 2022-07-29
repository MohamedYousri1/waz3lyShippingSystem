import { AuthService } from './../../services/auth.service';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { MovementsService } from 'src/app/services/movements.service';
import { SubStatesService } from 'src/app/services/sub-states.service';
import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-movement',
  templateUrl: './edit-add-movement.component.html',
  styleUrls: ['./edit-add-movement.component.css']
})
export class EditAddMovementComponent implements OnInit {
  myform!:FormGroup
  submited:boolean=false
  id:any

  //two way binding from add_edit to show
  @Input() obj:any
  @Output() newData = new EventEmitter <any>()

  substatus:any[]=[]
  employees:any[]=[]
  constructor(private fb:FormBuilder,
    private pay_ser:MovementsService,
    private substat_ser:SubStatesService,
    private client_serv:EmployeeService,
    private http:AuthService,
    private toaster:ToastrService ,
    private x : MessageService ,


    ) { }

  ngOnInit(): void {
    // this.send_token() ;
    this.build() //build fun
    this.patchValue() //patch value fun

    console.log(this.obj);

    //if this is oject
    if(this.obj){
      this.id=this.obj.id
    }else{
      this.id=""
    }


    //new from here
    this.get_substatus()
    this.getClient_sales()

  }

  // send token
  // send_token()
  // {

  //   debugger

  //   this.pay_ser.send_token(this.http.currentUser.getValue()).subscribe(res => {
  //     console.log(res);

  //   })
  // }

  //new from here
  // get_employees(){
  //   this.client_serv.get_client(55).subscribe(res => {
  //     this.employees = res ;
  //     console.log(res);
  //     this.emp_id = res[0].employee_id ;

  //   })
  // }

  emp_id  ;
  get_substatus(){
    this.substat_ser.getAll().subscribe(
      res=>{

        this.substatus=res ;

      }
    )
  }

  build(){
    this.myform=this.fb.group({
      client_id:[null, Validators.required],
      sub_state_id:[null, Validators.required]
    })
  }
  get f() { return this.myform.controls }


  //submit
  onsubmit(id){
    this.submited=true
    if(this.myform.invalid){
      return;
    }

    if(id === ""){
      this.add(this.myform.value)
    }else{
      this.edit(this.formData, id)
    }
  }

  allClients_sales ;
  getClient_sales()
  {

    if(localStorage.getItem('employee') && JSON.parse(localStorage.getItem('employee')).employee.is_sales == 1 )
    {
      console.log("dddddd")
      this.emp_id = JSON.parse(localStorage.getItem('employee')).employee.id ;
      return this.pay_ser.getClientfOnSales(this.emp_id).subscribe(res =>  {
        this.allClients_sales = res ;
        console.log(this.allClients_sales )
      })
    }
  }

formData = new FormData() ;


  //add
  add(data){

    this.formData.append('client_id' , this.myform.controls.client_id.value) ;
    this.formData.append('sub_state_id' , this.myform.controls.sub_state_id.value) ;
    this.formData.append('employee_id' ,  this.emp_id) ;

    this.pay_ser.add(this.formData).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after()

        }, 1000);
      },err=>{
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }

  //edit
  edit(data, id){

    this.formData.append('client_id' , this.myform.controls.client_id.value) ;
    this.formData.append('sub_state_id' , this.myform.controls.sub_state_id.value) ;
    this.formData.append('employee_id' ,  this.emp_id) ;
    this.pay_ser.edit(this.formData,id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after()
      },err=>{
        console.log(err);
          this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }

 //patch value for two way binding
  patchValue(){
    this.myform.patchValue({
      client_id:this.obj.client_id,
      sub_state_id:this.obj.sub_state_id
    })
  }


  //after update
  after(){
    console.log('ager');
    this.pay_ser.getAll().subscribe(
      res=>{
        this.newData.emit(res)
      }
    )
  }


}
