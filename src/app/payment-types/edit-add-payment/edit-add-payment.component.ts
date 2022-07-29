import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-payment',
  templateUrl: './edit-add-payment.component.html',
  styleUrls: ['./edit-add-payment.component.css']
})
export class EditAddPaymentComponent implements OnInit {
  myform!:FormGroup
  submited:boolean=false
  id:any

  //two way binding from add_edit to show
  @Input() obj:any
  @Output() newData = new EventEmitter <any>()
  constructor(private fb:FormBuilder,private x : MessageService ,   private pay_ser:PaymentService, private toaster:ToastrService) { }

  ngOnInit(): void {
    this.build() //build fun
    this.patchValue() //patch value fun

    console.log(this.obj);

    //if this is oject
    if(this.obj){
      this.id=this.obj.id
    }else{
      this.id=""
    }

  }


  build(){
    this.myform=this.fb.group({
      type:[null, Validators.required],
      description:[null, Validators.required]
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
      this.edit(this.myform.value, id)
    }
  }


  //add
  add(data){
    this.pay_ser.add(data).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after()

        }, 1000);
      },err=>{
        console.log(err);
        if(err.error?.errors?.type)
        {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: err.error?.errors.type[0]});
        }
    }
    )
  }

  //edit
  edit(data, id){
    this.pay_ser.edit(data,id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after()
      },err=>{
        console.log(err);
        if(err.error?.errors?.type)
        {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: err.error?.errors.type[0]});
        }
    }
    )
  }

 //patch value for two way binding
  patchValue(){
    this.myform.patchValue({
      type:this.obj.type,
      description:this.obj.description
    })
  }


  //after update
  after(){
    console.log('ager');
    this.pay_ser.getAll().subscribe(
      res=>{
        this.newData.emit(res.payment_type)
      }
    )
  }


}
