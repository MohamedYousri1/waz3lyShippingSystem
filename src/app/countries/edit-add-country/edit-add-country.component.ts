
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-country',
  templateUrl: './edit-add-country.component.html',
  styleUrls: ['./edit-add-country.component.css']
})

  export class EditAddCountryComponent implements OnInit {

  myform!:FormGroup;
  submited:boolean=false

  //catch obj here
  @Input() Catchobj:any
  itmeId:any
  //from child to parnt to refresh
  @Output() items= new EventEmitter <any> ()


  constructor(private fb:FormBuilder, private x : MessageService ,   private count_ser:CountriesService, private toster:ToastrService) { }

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
      name:[null, Validators.required],
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
        this.edit(this.myform.value, this.itmeId)
      }
    }








  //add function
  add(data){
    if(this.myform.controls.name.value == null || this.myform.controls.name.value == '' )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال الدوله'});
    }else
    {
      this.count_ser.add(data).subscribe(
        res=>{
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
          setTimeout(() => {
            this.after_up()

          }, 1000);
        },err=>{
          if(err.error?.errors.name)
          {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
          }
        }
      )
    }

  }

  //edit funciton
    edit(data, id){
      if(this.myform.controls.name == null )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال الدوله'});
    }else
    {
      this.count_ser.edit(data, id).subscribe(
        res=>{
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
          this.after_up()
        },err=>{
          if(err.error?.errors.name)
          {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
          }
        }
      )
    }

    }


  //patch value for two way binding
  patchValue(){
    this.myform.patchValue({
      name:this.Catchobj.name,
    })
  }

  //after added to send updated data to show
  after_up(){
    debugger
    this.count_ser.get_All().subscribe(
      res=>{
        debugger
        console.log(res);

        this.items.emit(res.Country)
      }
    )
  }
}


