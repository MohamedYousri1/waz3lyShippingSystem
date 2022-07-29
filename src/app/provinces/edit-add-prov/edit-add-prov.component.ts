
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvincesService } from 'src/app/services/provinces.service';
import { CountriesService } from 'src/app/services/countries.service';

import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-prov',
  templateUrl: './edit-add-prov.component.html',
  styleUrls: ['./edit-add-prov.component.css']
})

  export class EditAddProvComponent implements OnInit {

  myform!:FormGroup;
  submited:boolean=false

  //catch obj here
  @Input() Catchobj:any
  itmeId:any
  //from child to parnt to refresh
  @Output() items= new EventEmitter <any> ()


  country_id:any
  countries:any[]=[]

  constructor(private fb:FormBuilder, private x : MessageService , private prov_ser:ProvincesService, private country_ser:CountriesService, private toster:ToastrService) { }

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

    ///new
    this.contry()
  }
  contry(){
    this.country_ser.get_All().subscribe(
      res=>{
        this.countries=res.Country
      }
    )
  }
  changeProv(e) {
    this.myform.setValue(e.target.value, {
      onlySelf: true
    })
  }

  //build
  build(){
    this.myform=this.fb.group({
      name:[null, Validators.required],
      country_id:[null, Validators.required]
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

    if(this.myform.controls.name.value == null )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال إسم المحافظه '});
    }else if(this.myform.controls.country_id.value == null )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إختيار الدوله'});
    }else
    {
      this.prov_ser.add(data).subscribe(
        res=>{
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
          setTimeout(() => {
            this.after_up()

          }, 1000);
        },err=>{
          if(err.error?.errors.name)
          {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
          }else if(err.error?.errors?.country_id)
          {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors.country_id[0]}`});
          }
        }
      )
    }
  }

  //edit funciton
    edit(data, id){

      if(this.myform.controls.name.value == null )
      {
        this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال إسم المحافظه '});
      }else if(this.myform.controls.country_id.value == null )
      {
        this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إختيار الدوله'});
      }else
      {
        this.prov_ser.edit(data, id).subscribe(
          res=>{
            this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
            this.after_up()
          },err=>{
            if(err.error?.errors.name)
            {
            this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
            }else if(err.error?.errors?.country_id)
            {
            this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors.country_id[0]}`});
            }
          }
        )
      }

    }


  //patch value for two way binding
  patchValue(){
    this.myform.patchValue({
      name:this.Catchobj.name,
      country_id:this.Catchobj.country_id
    })
  }


  //after added to send updated data to show
  after_up(){
    this.prov_ser.get_All().subscribe(
      res=>{
        this.items.emit(res.provinces)
      }
    )
  }
}

