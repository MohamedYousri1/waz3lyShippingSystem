
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportService } from 'src/app/services/transport.service';
import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
    selector: 'app-edit-add-transport',
    templateUrl: './edit-add-transport.component.html',
    styleUrls: ['./edit-add-transport.component.css']
  })

  export class EditAddTransportComponent implements OnInit {

  myform!:FormGroup;
  submited:boolean=false

  //catch obj here
  @Input() Catchobj:any
  itmeId:any
  //from child to parnt to refresh
  @Output() items= new EventEmitter <any> ()


  constructor(private fb:FormBuilder,  private trans_ser:TransportService,  private x : MessageService , private toster:ToastrService) { }

  ngOnInit(): void {
    //build form
    this.build()
    //patch value to form
    this.patchValue()
    if(this.Catchobj){
       //console.log('edit working');
       this.itmeId=this.Catchobj.id
    }else{
      //console.log('add working');
      this.itmeId=''
    }
  }

  //build
  build(){
    this.myform=this.fb.group({
      type:[null, Validators.required],
      price:[null, [Validators.required]]
    })
  }
  //for form errors
  get f() {return this.myform.controls}

  //submit form
    onsubmit(id:any){
      this.submited=true
      if(this.myform.invalid){
        return
      }
      if(id === ""){
        this.add(this.myform.value)
      }else{
        this.edit(this.myform.value, id)
      }
    }

  //add function
  add(data){

    this.trans_ser.add(data).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after_up()

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

  //edit funciton
    edit(data, id){
      this.trans_ser.edit(data, id).subscribe(
        res=>{
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
          setTimeout(() => {
            this.after_up()

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


  //patch value for two way binding
  patchValue(){
    this.myform.patchValue({
      type:this.Catchobj.type,
      price:this.Catchobj.price
    })
  }

  //after added to send updated data to show
  after_up(){
    this.trans_ser.get_All().subscribe(
      res=>{
        this.items.emit(res.transport_type)
      }
    )
  }
}

