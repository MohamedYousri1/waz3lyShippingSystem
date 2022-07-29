import { AreasService } from 'src/app/services/areas.service';
import { PaymentService } from 'src/app/services/payment.service';
import { BranchesService } from './../../services/branches.service';
import { ClientsService } from './../../services/clients.service';
import { WayService } from './../../services/way.service';
import { InterestsService } from './../../services/interests.service';
import { ProvincesService } from './../../services/provinces.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-company',
  templateUrl: './edit-add-company.component.html',
  styleUrls: ['./edit-add-company.component.css']
})
export class EditAddCompanyComponent implements OnInit {
  myform:FormGroup
  submited:boolean=false
  id:any

  //two way binding bettween parnet and child
  @Input() CatchObj:any
  @Output() newData = new EventEmitter  <any> ()

  //replace id with names
  provs:any[]=[]  //prov name
  intersts:any[]=[] //intetsted level
  ways:any[]=[]  //knowledg ways
  clients_type:any[]=[]
  constructor(
    private fb:FormBuilder,
    private company_serv:ClientsService,
    private toastr:ToastrService,
    private x : MessageService  ,
    private brach_ser:BranchesService,
    private payment : PaymentService ,
    private _area : AreasService  ,
    private _province  : ProvincesService ,
              ){}

  ngOnInit(): void {
    this.build() //build
    this.patch()   //patch
    this.get_branches();
    this.get_paymentTypes()
    this.get_provinces() ;
    // this.clints_type_fun()  //clients type
    debugger
     if(this.CatchObj){
      this.id=this.CatchObj.id
    }else{
      this.id=""
    }
  }


  branches    : any  ;
  get_branches(){
    this.brach_ser.get_branchs().subscribe(
      res=>{
        this.branches=res.branches
      }
    )
  }

  // getting The Payment Types
  paymentTypes :any ;
  get_paymentTypes()
  {
    this.payment.getAll().subscribe(res => {
      this.paymentTypes = res.payment_type  ;
    })
  }


  build(){
    this.myform=this.fb.group({
      name:[null, Validators.required],
      address:[null, Validators.required],
      phone_number   :  [null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/gm)]],
      email:[null, Validators.required],
      password:[null],
      password_confirmation : [null ] ,
      flyer_stock:[null],
      // allowed_weight:[null],
      pick_up_fee:[null],
      minimum_sunday_pick_up : [null] ,
      shipment_type : [null] ,
      city_id : [null] ,
      governorate_id : [null] ,



      // payment_method : [null] ,
      // area_id :[1 , Validators.required]  ,
      branch_id  : [null  ,Validators.required] ,
      payment_type_id : [null , Validators.required]

    })
  }

  get f(){return this.myform.controls}

  //submit
  onsubmit(id){
    this.submited=true
    debugger
    // if(this.myform.invalid){
    //   return;
    // }else
  if(id === ""){
      this.add(this.myform.value)
    }else{
      this.edit(this.myform.value, id)

    }

  }

  //add
  add(data){
    debugger
    this.company_serv.add_company(data).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        console.log(res);
        setTimeout(() => {
          this.after()
        }, 1000);
      },err =>
      {
        debugger
        console.log(err);

        if(err.error?.errors?.phone_number)
        {
        this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.phone_number[0]}`});
        }else if(err.errors?.password)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.password[0]}`});
        }else if(err.errors?.password)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.password[0]}`});
        }else if(err.errors?.name)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
        }else if(err.errors?.email)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.email[0]}`});
        }else if(err.errors?.shipment_type)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.shipment_type[0]}`});
        }else if(err.errors?.city_id)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.city_id[0]}`});
        }else if(err.errors?.governorate_id)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.governorate_id[0]}`});
        }
        console.log(err);
      }
    )
  }

  //edit
  edit(data, id){
    console.log("edit")
    this.company_serv.edit_company(data, id).subscribe(
      res=>{
        console.log(res)
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after()
      },err =>
      {
        if(err.error?.errors?.phone_number)
        {
        this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.phone_number[0]}`});
        }else if(err.errors?.password)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.password[0]}`});
        }else if(err.errors?.password)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.password[0]}`});
        }else if(err.errors?.name)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
        }else if(err.errors?.email)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.email[0]}`});
        }else if(err.errors?.shipment_type)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.shipment_type[0]}`});
        }else if(err.errors?.city_id)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.city_id[0]}`});
        }else if(err.errors?.governorate_id)
        {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.governorate_id[0]}`});
        }
        console.log(err);
      }
    )
  }

  //patch
  patch(){

    this.onProvinceChange(this.CatchObj.citie?.governorate_id) ;

    this.myform.patchValue({
      name:this.CatchObj.name,
      address:this.CatchObj.address,
      phone_number   :  this.CatchObj.user?.phone_number,
      email:this.CatchObj.user?.email,
      // password:this.CatchObj.password,
      // password_confirmation : [null , Validators.required] ,
      flyer_stock:this.CatchObj.flyer_stock,
      // allowed_weight:this.CatchObj.allowed_weight,
      pick_up_fee:this.CatchObj.pick_up_fee,
      minimum_sunday_pick_up:this.CatchObj.minimum_sunday_pick_up ,
      shipment_type :this.CatchObj.shipment_type ,
      city_id :this.CatchObj.city_id ,
      governorate_id :this.CatchObj.citie?.governorate_id ,


      // payment_method : [null] ,
      branch_id  : this.CatchObj.branch_id ,
      payment_type_id : this.CatchObj.payment_type_id


    })
  }

  //after update
  after(){
    this.company_serv.getAllCompanies().subscribe(
      res=>{
        this.newData.emit(res.companies )
      }
    )
  }


  provinces :any ;
  get_provinces()
  {
    this._province.get_ProvincesReady().subscribe(res => {
      this.provinces = res.governorate
    })
  }




  allAreas ;
  onProvinceChange(province_id : any )
  {
    console.log(province_id);
    debugger
  if(province_id)
  {
    this._area.get_area_inProvinceReady(province_id).subscribe((res  : any ) =>  {
      debugger
      this.allAreas = res.city  ;
    },err=> {
      console.log(err);

    })
  }
  }


}
