
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreasService } from 'src/app/services/areas.service';
import { ProvincesService } from 'src/app/services/provinces.service';
import {MessageService} from 'primeng/api';
import { CountriesService } from 'src/app/services/countries.service';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-area',
  templateUrl: './edit-add-area.component.html',
  styleUrls: ['./edit-add-area.component.css']
})

  export class EditAddAreaComponent implements OnInit {

  myform!:FormGroup;
  submited:boolean=false

  //catch obj here
  @Input() Catchobj:any
  itmeId:any
  countries:any[]=[]
  //from child to parnt to refresh
  @Output() items= new EventEmitter <any> ()

  provinces:any[]=[]

  constructor(private fb:FormBuilder, private x : MessageService , private area_ser:AreasService, private provs_ser:ProvincesService, private toster:ToastrService ,private country_ser:CountriesService) { }

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
    this.gstCountry()

    this.getprovs()
  }

  getprovs(){
    this.provs_ser.get_All().subscribe(
      res=>{
        this.provinces=res.provinces
      }
    )
  }

  gstCountry(){
    this.country_ser.get_All().subscribe(
      res=>{
        this.countries=res.country
        console.log(this.countries)
      }
    )
  }

  //build
  build(){
    this.myform=this.fb.group({
      name:[null, Validators.required],
      province_id:[null, Validators.required],
      // country_id:[null, Validators.required]
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
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال المنطقه'});
    }else if (this.myform.controls.province_id.value == null)
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إختيار المحافظه'});
    }else
    {
      this.area_ser.add(data).subscribe(
        res=>{
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
          setTimeout(() => {
            this.after_up()
          }, 1000);
        },err=>{
          if(err.error?.errors.name)
          {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
          }else if(err.error?.errors?.province_id)
          {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors.province_id[0]}`});
          }
        }
      )
    }

  }

  //edit funciton
  edit(data, id){

    if(this.myform.controls.name.value == null )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال المنطقه'});
    }else if (this.myform.controls.province_id.value == null)
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إختيار المحافظه'});
    }else
    {
      this.area_ser.edit(data, id).subscribe(
        res=>{
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
          this.after_up()
        },err=>{
          if(err.error?.errors.name)
          {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
          }else if(err.error?.errors?.province_id)
          {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors.province_id[0]}`});
          }
        }
      )

    }

  }


  //patch value for two way binding
  patchValue(){
    this.myform.patchValue({
      name:this.Catchobj.name,
      province_id:this.Catchobj.province_id,
      country_id:this.Catchobj.country_id
    })
  }

  //after added to send updated data to show
  after_up(){
    console.log('after');
    this.area_ser.get_All().subscribe(
      res=>{
        this.items.emit(res.areas)
      }
    )
  }
}

