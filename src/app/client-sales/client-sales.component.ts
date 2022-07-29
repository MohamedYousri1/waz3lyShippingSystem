import { MovementsService } from 'src/app/services/movements.service';
import { SubStatesService } from './../services/sub-states.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesService } from '../services/sales.service';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-client-sales',
  templateUrl: './client-sales.component.html',
  styleUrls: ['./client-sales.component.css']
})
export class ClientSalesComponent implements OnInit {

  catch_id:any
  allClients:any[]=[]
  myform : FormGroup ;
  // submited:boolean=false
  id:any
  //pagination
  rows = 5;
  recourdNumber:number;
  constructor(
              private _sales:SalesService,
              private modal:NgbModal,
              private fb: FormBuilder ,
              private toaster:ToastrService,
              private rout:ActivatedRoute ,
              private substat_ser:SubStatesService,
              private pay_ser:MovementsService,
              private x : MessageService ,

              ) { }


  ngOnInit(): void {

    this.build() ;
    this.getClient_sales()
    this.get_substatus()
    this.rout.params.subscribe(
      res=>{
        this.catch_id=res.id
      }
    )
    this.get_clients(this.catch_id) ;

  }


  ship_id
  storage_id

 //get one shipment
 get_clients(id){
  this._sales.get_client_sale(id).subscribe(
    res=>{
      this.allClients=res
      console.log(res);
    }
  )
}


allMovements ;
get_client_movements(id)
{
  this._sales.get_client_movements(id).subscribe(res =>  {
    this.allMovements = res ;
  })
}
// sale_id
add_edit(modal,obj){
  debugger
  this.storage_id = obj.storage_id
  this.modal.open(modal, {size:'lg' , backdrop : 'static',keyboard : false}) //, backdrop: 'static'
  this.get_client_movements(obj.id) ;

}



substatus ;
emp_id  ;
get_substatus(){
  this.substat_ser.getAll().subscribe(
    res=>{
      debugger
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
onsubmit(){
  // this.submited=true
  if(this.myform.invalid){
    return;
  }
    this.add(this.myform.value)

}

allClients_sales ;
getClient_sales()
{
  debugger
  if(localStorage.getItem('employee') && JSON.parse(localStorage.getItem('employee')).employee.is_sales == 1 )
  {
    this.emp_id = JSON.parse(localStorage.getItem('employee')).employee.id ;
    return this.pay_ser.getClientfOnSales(JSON.parse(localStorage.getItem('employee')).employee.id).subscribe(res =>  {
      this.allClients_sales = res ;
    })
  }
}

formData = new FormData() ;


//add
add(data){
  debugger
  this.formData.append('client_id' , this.myform.controls.client_id.value) ;
  this.formData.append('sub_state_id' , this.myform.controls.sub_state_id.value) ;
  this.formData.append('employee_id' ,  this.emp_id) ;

  this.pay_ser.add(this.formData).subscribe(
    res=>{
      this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
      setTimeout(() => {

      }, 1000);
     },err=>{
      console.log(err);
      if(err){
          this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    }
  )
}

//edit
edit(data, id){
  debugger
  this.formData.append('client_id' , this.myform.controls.client_id.value) ;
  this.formData.append('sub_state_id' , this.myform.controls.sub_state_id.value) ;
  this.formData.append('employee_id' ,  this.emp_id) ;
  this.pay_ser.edit(this.formData,id).subscribe(
    res=>{
      this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
    },err=>{
      if(err){
          this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    }
  )
}

//patch value for two way binding
// patchValue(){
//   this.myform.patchValue({
//     client_id:this.obj.client_id,
//     sub_state_id:this.obj.sub_state_id
//   })
// }


// //after update
// after(){
//   console.log('ager');
//   this.pay_ser.getAll().subscribe(
//     res=>{
//       this.newData.emit(res)
//     }
//   )
// }
}
