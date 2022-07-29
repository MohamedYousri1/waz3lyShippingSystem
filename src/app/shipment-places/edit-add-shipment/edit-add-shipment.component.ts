import { ProvincesService } from './../../services/provinces.service';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentPlacesService } from 'src/app/services/shipment-places.service';
import { AreasService } from 'src/app/services/areas.service';
import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-shipment',
  templateUrl: './edit-add-shipment.component.html',
  styleUrls: ['./edit-add-shipment.component.css']
})

  export class EditAddShipmentComponent implements OnInit {

  myform!:FormGroup;
  submited:boolean=false
  itmeId:any



  //from child to parnt to refresh
  @Input() Catchobj:any
  @Output() items= new EventEmitter <any> ()

  areas:any[]=[]
  provinces  : any ;
  constructor(private fb:FormBuilder,
    private ship_ser:ShipmentPlacesService,
    private toster:ToastrService,
    private areas_ser:AreasService ,
    private _province  : ProvincesService ,
    private x : MessageService ,
    ){ }

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

    //new run
    // this.get_areas()
    this.get_provinces()
  }

  //new here
  // get_areas(){
  //   this.areas_ser.get_All().subscribe(
  //     res=>{
  //       this.areas=res.areas.data;
  //       console.log(res);
  //     }
  //   )
  // }

  get_provinces()
  {
    this._province.get_All().subscribe(res => {
      this.provinces = res.provinces
    })
  }

  onProvinceChange(province_id : any )
  {
    console.log(province_id);

    debugger
  if(province_id)
  {
    this.areas_ser.get_area_inProvince(province_id).subscribe((res  : any ) =>  {
      debugger
      this.areas = res.area  ;
    },err=> {
      console.log(err);

    })
  }
  }

  //build
  build(){
    this.myform=this.fb.group({
      transportation_price:[null, Validators.required],
      area_id:[null, Validators.required],
      delivery_time:[null],
      returned_time:[null],
      save_for_all:[0],

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
    debugger
    console.log(data);
    this.ship_ser.add(data).subscribe(
      res=>{
        console.log(res);
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after_up()
          this.myform.reset() ;
        }, 1000);
      },err=>{
        console.log(err);
        if(err){
          if(err.error.errors == "this area already exist"){
            this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: 'لقد قمت بتعريف هذه المنطقه من قبل '});
          }else
          this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
        }
      }
    )
  }

  //edit funciton
  edit(data, id){
    debugger
    this.ship_ser.edit(data, id).subscribe(
      res=>{
        this.x.add({key: 'myKey1', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after_up()
      },err=>{
        if(err){
          if(err.error.amount){
            this.toster.error(err.error.amount[0], 'خطا')
          }
          if(err.error.from){
            this.toster.error(err.error.from[0], 'خطا')
          }
          if(err.error.to){
            this.toster.error(err.error.to[0], 'خطا')
          }
        }
      }
    )
  }


  //patch value for two way binding
  patchValue(){
    this.myform.patchValue({
      transportation_price: this.Catchobj.transportation_price,
      area_id: this.Catchobj.area_id,
      delivery_time: this.Catchobj.delivery_time,
      returned_time: this.Catchobj.returned_time,
    })
  }

  //after added to send updated data to show
  after_up(){
    console.log('after');
    this.ship_ser.get_All().subscribe(
      res=>{
        this.items.emit(res.shippingareaprice)
        this.myform.reset() ;

      }
    )
  }
}

