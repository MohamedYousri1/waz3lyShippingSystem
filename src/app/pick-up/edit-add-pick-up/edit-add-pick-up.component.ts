import { TransportService } from 'src/app/services/transport.service';
import { ToastrService } from 'ngx-toastr';
import { PickUpService } from './../../services/pick-up.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  providers : [MessageService , ConfirmationService] ,
  selector: 'app-edit-add-pick-up',
  templateUrl: './edit-add-pick-up.component.html',
  styleUrls: ['./edit-add-pick-up.component.css']
})
export class EditAddPickUpComponent implements OnInit {
  myform!:FormGroup
  submited:boolean = false

  @Input() Catchobj; //get from show for edit
  id:any;
  @Output() sent_new= new EventEmitter <any> () //sent new data
  constructor(
     private fb:FormBuilder,
     private x : MessageService ,
     private _pickServ:PickUpService,
     private toster:ToastrService ,
     private _transport  :  TransportService
     ) { }

  ngOnInit(): void {
    this.build()
    this.patch()
    this.getTransportTypes()

    if (this.Catchobj) {
      this.id=this.Catchobj.id
    }else{
      this.id=''
    }
  }

  // getting the Transport Types
  transportTypes : any ;
  getTransportTypes()
  {
    this._transport.get_All().subscribe(res => {
      this.transportTypes = res.transport_type ;
    })
  }


  build(){
    this.myform=this.fb.group({
      transport_type_id:[null, Validators.required],
      qty:[null, Validators.required],
      notes:[null, Validators.required],
    })
  }

  get f(){ return this.myform.controls}

  onsubmit(id){
    this.submited=true
    if(this.myform.invalid){
      return;
    }
    if(id === ""){
      this.add()
    }else{
      this.edit(this.myform.value, id)
    }
  }
  add(){
    this._pickServ.add_pickup(this.myform.value).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم أرسال طلبك بنجاح سيتم التواصل معك من خلال فريق الشركة '});
        setTimeout(() => {
          this.after_update()
        }, 1000);
      },err=>{
        console.log(err);
        // if(err){
        //   if(err.error.name[0]){
        //     this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'هذا الاسم موجود مسبقا'});
        //   }else{
        //     this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي التاكد من البيانات صحيحه'});
        //   }
        // }
      }
    )
  }

  edit(data, id){
    this._pickServ.edit_pickup(data,id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم تعديل طلبك بنجاح سيتم التواصل معك من خلال فريق الشركة '});
        this.after_update()
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


  //patch value to form
  patch(){
    this.myform.patchValue({
      qty:this.Catchobj.qty ,
      notes:this.Catchobj.notes ,
      transport_type_id:this.Catchobj.transport_type_id ,

    })
  }


  //after update
  after_update(){
    this._pickServ.get_pickups().subscribe(
      res=>{
        this.sent_new.emit(res.pickup?.data)
      }
    )
  }

}
