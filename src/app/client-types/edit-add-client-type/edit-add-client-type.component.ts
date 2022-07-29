
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientTypesService } from 'src/app/services/client-types.service';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-client-type',
  templateUrl: './edit-add-client-type.component.html',
  styleUrls:   ['./edit-add-client-type.component.css']
})

  export class EditAddClientTypeComponent implements OnInit {

  myform!:FormGroup;
  submited:boolean=false

  //catch obj here
  @Input() Catchobj:any
  itmeId:any
  //from child to parnt to refresh
  @Output() items= new EventEmitter <any> ()


  constructor(private fb:FormBuilder,private x : MessageService ,  private Client_t_ser:ClientTypesService, private toster:ToastrService) { }

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
    console.log('add fun');
    this.Client_t_ser.add(data).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after_up()

        }, 1000);
      },err=>{
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }

  //edit funciton
  edit(data, id){
    this.Client_t_ser.edit(data, id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after_up()
      },err=>{
        console.log(err);
          this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }


  //patch value for two way binding
  patchValue(){
    this.myform.patchValue({
      type:this.Catchobj.type,
    })
  }

  //after added to send updated data to show
  after_up(){
    console.log('after');
    this.Client_t_ser.get_All().subscribe(
      res=>{
        this.items.emit(res)
      }
    )
  }
}

