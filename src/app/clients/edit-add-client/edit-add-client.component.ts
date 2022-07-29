import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientTypesService } from 'src/app/services/client-types.service';
import { ClientsService } from 'src/app/services/clients.service';
import { InterestsService } from 'src/app/services/interests.service';
import { ProvincesService } from 'src/app/services/provinces.service';
import { WayService } from 'src/app/services/way.service';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-client',
  templateUrl: './edit-add-client.component.html',
  styleUrls: ['./edit-add-client.component.css']
})
export class EditAddClientComponent implements OnInit {
  myform!:FormGroup
  submited:boolean=false
  id:any

  //two way binding bettween parnet and child
  @Input() CatchObj:any
  @Output() newData = new EventEmitter <any> ()

  //replace id with names
  provs:any[]=[]  //prov name
  intersts:any[]=[] //intetsted level
  ways:any[]=[]  //knowledg ways
  clients_type:any[]=[]
  constructor(private fb:FormBuilder,
              private client_ser:ClientsService,
              private toastr:ToastrService,
              private prov_ser:ProvincesService,
              private inter_ser:InterestsService,
              private way_ser:WayService,
              private clint_tpye:ClientTypesService ,
              private x : MessageService ,
              ){}

  ngOnInit(): void {
    this.build() //build
    this.patch()   //patch
    this.get_prov() //provinces
    this.interested() //interested
    this.ways_fun()  //ways funciton
    this.clints_type_fun()  //clients type

    if(this.CatchObj){
      this.id=this.CatchObj.id
    }else{
      this.id=""
    }
  }

  build(){
    this.myform=this.fb.group({
      first_name:[null, Validators.required],
      last_name:[null, Validators.required],
      address:[null, Validators.required],
      phone:[null, Validators.required],
      product_type:[null, Validators.required],
      project_name:[null, Validators.required],
      orders_per_month:[null, Validators.required],
      client_type_id:[null, Validators.required],
      province_id:[null, Validators.required],
      way_id:[null, Validators.required],
      interest_level_id:[null, Validators.required],
    })
  }

  get f(){return this.myform.controls}

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
    this.client_ser.add(data).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after()

        }, 1000);
      },err=>{
        console.log(err)
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }

  //edit
  edit(data, id){
    this.client_ser.edit(data, id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after()
      },err=>{
        console.log(err);
          this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }

  //patch
  patch(){
    this.myform.patchValue({
      first_name: this.CatchObj.first_name,
      last_name: this.CatchObj.last_name,
      address: this.CatchObj.address,
      phone: this.CatchObj.phone,
      product_type: this.CatchObj.product_type,
      project_name: this.CatchObj.project_name,
      orders_per_month: this.CatchObj.orders_per_month,
      client_type_id: this.CatchObj.client_type_id,
      province_id: this.CatchObj.province_id,
      way_id: this.CatchObj.way_id,
      interest_level_id: this.CatchObj.interest_level_id,
    })
  }


  //after update
  after(){
    this.client_ser.getAll().subscribe(
      res=>{
        this.newData.emit(res)

      }
    )
  }



  ////////////////////////////////////////////// another servicess
  get_prov(){
    this.prov_ser.get_All().subscribe(
      res=>{
        this.provs=res;
        console.log('idddddd');

        console.log(res)
      }
    )
   }
  changeProv(e) {
    this.myform.setValue(e.target.value, {
      onlySelf: true
    })
  }

  //interested services
  interested(){
    this.inter_ser.get_All().subscribe(
      res=>{
         this.intersts=res
      }
    )
  }
  changeInter(e) {
    this.myform.setValue(e.target.value, {
      onlySelf: true
    })
  }

  ////ways services
  ways_fun(){
    this.way_ser.get_All().subscribe(
      res=>{
        this.ways=res
      }
    )
  }
  changeways(e) {
    this.myform.setValue(e.target.value, {
      onlySelf: true
    })
  }


  ////ways services
  clints_type_fun(){
    this.clint_tpye.get_All().subscribe(
      res=>{
        this.clients_type=res
      }
    )
  }
  changetyps(e) {
    this.myform.setValue(e.target.value, {
      onlySelf: true
    })
    }



}
