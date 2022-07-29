import { OfferService } from './../../services/offer.service';
import { TransportService } from 'src/app/services/transport.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  providers : [MessageService , ConfirmationService] ,
  selector: 'app-edit-add-offer',
  templateUrl: './edit-add-offer.component.html',
  styleUrls: ['./edit-add-offer.component.css']
})
export class EditAddOfferComponent implements OnInit {
  myform!:FormGroup
  submited:boolean = false

  @Input() Catchobj; //get from show for edit
  id:any;
  @Output() sent_new= new EventEmitter <any> () //sent new data
  constructor(
     private fb:FormBuilder,
     private x : MessageService ,
     private _offer:OfferService,
     private toster:ToastrService ,
     private _transport  :  TransportService
     ) { }

  ngOnInit(): void {
    this.build()
    this.patch()

    if (this.Catchobj) {
      this.id=this.Catchobj.id
    }else{
      this.id=''
    }
  }



  build(){
    this.myform=this.fb.group({
      title:[null, Validators.required],
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
    this._offer.add_offer(this.myform.value).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح  '});
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
    this._offer.edit_offer(data,id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح '});
        this.after_update()
      },err=>{
        console.log(err);
        if(err){
            console.log(err);
            if(err){
              if(err.error.title[0]){
                this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'هذا العرض موجود مسبقا'});
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
      title:this.Catchobj.title ,
    })
  }


  //after update
  after_update(){
    this._offer.get_offers().subscribe(
      res=>{
        this.sent_new.emit(res.offer)
      }
    )
  }

}
