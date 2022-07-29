
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentTypesService } from 'src/app/services/shipment-types.service';
import { AreasService } from 'src/app/services/areas.service';
import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-ship',
  templateUrl: './edit-add-ship.component.html',
  styleUrls: ['./edit-add-ship.component.css']
})


  export class EditAddShipComponent implements OnInit {

  myform!:FormGroup;
  submited:boolean=false
  itmeId:any



  //from child to parnt to refresh
  @Input() Catchobj:any
  @Output() items= new EventEmitter <any> ()

  areas:any[]=[]
  constructor(private fb:FormBuilder, private x : MessageService , private ship_ser:ShipmentTypesService, private areas_ser:AreasService, private toster:ToastrService) { }

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

  get_areas(){
    this.areas_ser.get_All().subscribe(
      res=>{
        this.areas=res
      }
    )
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
    this.ship_ser.add(data).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after_up()

        }, 1000);
      },err=>{
        if(err.error?.errors?.type)
        {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: err.error?.errors.type[0]});
        }
    }
    )
  }


  //edit funciton
  edit(data, id){
    this.ship_ser.edit(data, id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after_up()
      },err=>{
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
    })
  }

  //after added to send updated data to show
  after_up(){
    console.log('after');
    this.ship_ser.get_All().subscribe(
      res=>{
        this.items.emit(res.service_type)
      }
    )
  }
}

