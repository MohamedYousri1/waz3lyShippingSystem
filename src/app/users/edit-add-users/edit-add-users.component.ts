import { UsersService } from './../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-users',
  templateUrl: './edit-add-users.component.html',
  styleUrls: ['./edit-add-users.component.css']
})
export class EditAddUsersComponent implements OnInit {
  myform!:FormGroup
  submited:boolean=false
  id:any

  //two way binding bettween parnet and child
  @Input() CatchObj:any
  @Output() newData = new EventEmitter <any> ()

  //replace id with names

  clients_type:any[]=[]
  constructor(private fb:FormBuilder,
              private client_ser:UsersService,
              private x : MessageService ,
              private toastr:ToastrService,
              ){}

  ngOnInit(): void {
    this.build() //build
    this.patch()   //patch

    if(this.CatchObj){
      this.id=this.CatchObj.id
    }else{
      this.id=""
    }
  }

  build(){
    this.myform=this.fb.group({
      first_name:[null, Validators.required],
      second_name:[null, Validators.required],
      last_name:[null, Validators.required],
      city:[null, Validators.required],
      address:[null, Validators.required],
      phone_number:[null, Validators.required],

    })
  }

  get f(){return this.myform.controls}

  //submit
  onsubmit(id){
    this.submited=true
    if(this.myform.invalid){
      return;
    }

    if(id === ""){
      this.add(this.myform.value)
    }else{
      this.edit(this.myform.value, id)
    }

  }

  //add
  add(data){
    debugger
    this.client_ser.add(data).subscribe(
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
    this.client_ser.edit(data, id).subscribe(
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

  //patch
  patch(){

    this.myform.patchValue({
      first_name: this.CatchObj.first_name,
      city: this.CatchObj.city,
      second_name: this.CatchObj.second_name,
      last_name: this.CatchObj.last_name,
      address: this.CatchObj.address,
      phone_number: this.CatchObj.phone_number,

    })
  }


  //after update
  after(){
    this.client_ser.getAll().subscribe(
      res=>{
        this.newData.emit(res)
      }
    )
  }




}
