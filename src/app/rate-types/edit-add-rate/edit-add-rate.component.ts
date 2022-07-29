import { ToastrService } from 'ngx-toastr';
import { RateTypesService } from './../../services/rate-types.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-rate',
  templateUrl: './edit-add-rate.component.html',
  styleUrls: ['./edit-add-rate.component.css']
})
export class EditAddRateComponent implements OnInit {
  myform!: FormGroup
  submited: boolean = false
  id: any

  //two way binding
  @Input() obj:any
  @Output() newData = new EventEmitter <any>()
  constructor(private fb: FormBuilder,private x : MessageService , private rate_serv: RateTypesService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.build() //build form
   this.patch() //patch value

    if(this.obj){
      this.id=this.obj.id
    }else{
      this.id=""
    }

  }


  build() {
    this.myform = this.fb.group({
      type: [null, Validators.required]
    })
  }

  get f() { return this.myform.controls }


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
    this.rate_serv.add(data).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after()
        }, 1000);

      },err=>{
        console.log(err);
        if(err){
          if(err.error.name[0]){
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'هذا الاسم موجود مسبقا'});
          }else{
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي التاكد من البيانات صحيحه'});
          }
        }
      }
    )
  }

  //edit
  edit(data, id){
    this.rate_serv.edit(data, id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after()
      },err=>{
        console.log(err);
        if(err){
            console.log(err);
            if(err){
              if(err.error.name[0]){
                this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'هذا الاسم موجود مسبقا'});
              }else{
                this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي التاكد من البيانات صحيحه'});
              }
            }
        }
      }
    )
  }

  //patch
  patch(){
    this.myform.patchValue({
      type:this.obj.type
    })
  }

  //after update
  after(){
    this.rate_serv.get_All().subscribe(
      res=>{
        this.newData.emit(res)
      }
    )
  }

}
