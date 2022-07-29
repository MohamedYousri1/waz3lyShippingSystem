import { AreasService } from './../../services/areas.service';
import { ProvincesService } from 'src/app/services/provinces.service';
import { ShipmentsCompanyService } from './../../services/shipments-company.service';

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { BranchesService } from 'src/app/services/branches.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ShipmentTypesService } from 'src/app/services/shipment-types.service';
import { ClientsService } from 'src/app/services/clients.service';
import { TransportService } from 'src/app/services/transport.service';
import { StoragesService } from 'src/app/services/storages.service';
import { ShipmentPlacesService } from 'src/app/services/shipment-places.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ReceiveStatusesService } from 'src/app/services/receive-statuses.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { Observable } from 'rxjs';
import {MessageService} from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-ships',
  templateUrl: './edit-add-ships.component.html',
  styleUrls: ['./edit-add-ships.component.css']
})

export class EditAddShipsComponent implements OnInit {
  myform!: FormGroup;
  myform1! : FormGroup;
  myform2! : FormGroup;
  myform3! : FormGroup;
  myform4! : FormGroup;
  myfrom5!  : FormGroup;

  submited: boolean = false;
  id: any

  //two way binding
  @Input() Catchobj
  @Output() newData = new EventEmitter<any>()

  barnches:any   []=[];
  employees:any  []=[];
  shipsType:any  []=[];
  shipsPlace:any []=[];
  clients:any ;
  trans:any      []=[];
  storages:any   []=[];
  payments:any   []=[];
  transports:any []=[];
  receives: any  []=[];
  companys:any   []=[]


  //search
  filteredOptions: Observable<string[]>;
  constructor(private fb: FormBuilder,
    private _senderServ:ClientsService ,
       private ships_ser: ShipmentsCompanyService,
      private tostr: ToastrService,
      private ship_type_ser:ShipmentTypesService,
      private ship_place_ser:ShipmentPlacesService,
      private trans_ser:TransportService,
      private pay_ser:PaymentService,
      private recive_ser:ReceiveStatusesService,
      private _area : AreasService ,
      private x : MessageService  ,
      private modal:NgbModal,
      private servTypes : ShipmentTypesService ,
      private _province : ProvincesService
      // private splier_ser:SuppliersService
      ) { }

  ngOnInit() {

    debugger
      if(localStorage.getItem('employee'))
      {
        this.user_id = JSON.parse(localStorage.getItem('employee')).id ;
        // this.name = `${JSON.parse(localStorage.getItem('employee')).first_name } ${JSON.parse(localStorage.getItem('employee')).second_name } ${JSON.parse(localStorage.getItem('employee')).last_name } `
      }
    this.build() ;
    this.get_provinces();
    if(this.Catchobj){
      this.id=this.Catchobj.id
    }else{
      this.id=""
    }

    //run here
    // this.get_recives();
    // this.get_payments();
    // this.get_shipsPlace();
    // this.get_shipsType();
    // this.get_trans();
    // this.getAreas();
    this.getCompanies();
    this.get_serviceTypes()
    this.get_additionalserviceTypes();
    this.getshipmentStatus();
    // this.get_shipment_places() ;

    debugger
    this.catchObj() ;

  }


  // all Variables
  from_area_id ;
  to_area_id ;
  allPlaces
  allareas ;
  shipmentPrice ;
  place;
  shipment_place_id;
  user_id
  // name
    // get all Areas With Provinces

    // getAreas()
    // {
    //   return this._area.get_All().subscribe((res : any ) =>  {
    //     this.allareas  = res.areas.data ;
    //   })
    // }
    serviceTypes :any ;
    get_serviceTypes()
    {
      return this.servTypes.get_All().subscribe(res => {
        this.serviceTypes = res.service_type ;
      })
    }

    additionalServiceTypes :any ;
    get_additionalserviceTypes()
    {
      return this.servTypes.get_AdditionalServices().subscribe(res => {
        this.additionalServiceTypes = res.additional_service ;
      })
    }

    onProvince1Change(from_area_id)
    {
      debugger
      this.from_area_id = from_area_id ;
      // this.sendAreaId()

    }


  get_recives(){
    this.recive_ser.get_All().subscribe(
      res=>{
        this.receives=res
      }
    )
  }



  get_shipsType(){
    this.ship_type_ser.get_All().subscribe(
      res=>{
        this.shipsType=res
      }
    )
  }

  get_shipsPlace(){
    this.ship_place_ser.get_All().subscribe(
      res=>{
        this.shipsPlace=res
      }
    )
  }

  // get_clients(){
  //   this._senderServ.getAllCompanies().subscribe(
  //     res=>{
  //       this.clients=res.companies
  //     }
  //   )
  // }

  users ;
  getCompanies(){
    this._senderServ.getAllCompanies().subscribe(
      res=>{
        this.users=res.companies
      }
    )
  }
  shipmentStatus : any ;
  getshipmentStatus()
  {
    return this.ships_ser.get_shipmentStatus().subscribe((res : any ) => {
      this.shipmentStatus = res.shipment_status ;

    })
  }
  get_trans(){
    this.trans_ser.get_All().subscribe(
      res=>{
        this.transports=res
      }
    )
  }



  get_payments(){
    this.pay_ser.getAll().subscribe(
      res=>{
        this.payments=res
      }
    )
  }


  //event
  select(event){
    console.log(event.target.value);
    this.ship_place_ser.toarea(event.target.value).subscribe(
      res=>{
        console.log(res);
      }
    )
  }

from_area : any ;
to_area : any ;
  catchObj()
{
  debugger
  this.myform1.patchValue({
    product_price:  this.Catchobj.product_price,
    sender_id:      this.Catchobj.user?.id ,
    area_id:        this.Catchobj.area_id,
    province_id:        this.Catchobj.area?.province_id,
    name_shipment:  this.Catchobj.name_shipment,
    shipment_status_id:  this.Catchobj.shipment_status_id,
    address:        this.Catchobj.client?.address,
    name:           this.Catchobj.client?.name,
    phone:          this.Catchobj.client?.phone,
    service_type_id : this.Catchobj.service_type_id ,
  })

  // this.onProvince2Change(this.Catchobj.shipment_place?.to?.id) ;
  this.myform2.patchValue({
    order_number : this.Catchobj.order_number ,
      email2 : this.Catchobj.client?.email2 ,
      customer_code : this.Catchobj.customer_code ,
      weight : this.Catchobj.weight ,
      size : this.Catchobj.size ,
      count : this.Catchobj.count ,

      additional_service_id : this.Catchobj.additional_service_id ,
      description : this.Catchobj.description ,
      notes : this.Catchobj.notes ,

  })


  this.onProvinceChange(this.Catchobj.area?.province_id) ;
  // this.Catchobj.products?.forEach((ele , index) => {
  //     this.new_comp_product().patchValue({
  //       name : ele.name ,
  //     })
  // });

}



  // bulid
  build() {
    this.myform1 = this.fb.group({
      product_price: [null , Validators.required],
      sender_id: [null , Validators.required],
      area_id : [null , Validators.required ] ,
      province_id : [null] ,
      name_shipment : [null , Validators.required ] ,
      shipment_status_id : [null , Validators.required ] ,
      address  :[null , Validators.required ] ,
      name : [null , Validators.required] ,
      phone   :  [null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/gm)]],
      service_type_id : [null , Validators.required],
    });
    this.myform2 = this.fb.group({
      order_number : [null] ,
      email2 : [null] ,
      customer_code : [null] ,
      weight : [null] ,
      size : [null] ,
      count : [null] ,
      additional_service_id : [null] ,
      description : [null] ,
      notes : [null] ,

    });
  }


  get f() { return this.myform.controls }
    // get id of company from token
  formDataToSend = new FormData() ;
  sendDate ;
  finalDate ;

  is_breakable ;

  submit()
  {
    debugger
    if(this.Catchobj == '')
    {
      this.add() ;
    }else
    {
      this.edit(this.Catchobj.id) ;
    }
  }

  add()
  {
    debugger
    this.formDataToSend.append('name' , this.myform1.controls.name.value) ;
    this.formDataToSend.append('product_price' , this.myform1.controls.product_price.value) ;
    this.formDataToSend.append('sender_id' , this.myform1.controls.sender_id.value) ;
    this.formDataToSend.append('area_id' , this.myform1.controls.area_id.value) ;
    this.formDataToSend.append('name_shipment' , this.myform1.controls.name_shipment.value) ;
    this.formDataToSend.append('shipment_status_id' , this.myform1.controls.shipment_status_id.value) ;

    this.formDataToSend.append('address' , this.myform1.controls.address.value) ;
    this.formDataToSend.append('phone' , this.myform1.controls.phone.value) ;
    this.formDataToSend.append('order_number' , this.myform2.controls.order_number.value) ;
    this.formDataToSend.append('email2' , this.myform2.controls.email2.value) ;
    this.formDataToSend.append('customer_code' , this.myform2.controls.customer_code.value) ;
    this.formDataToSend.append('weight' , this.myform2.controls.weight.value) ;
    this.formDataToSend.append('size' , this.myform2.controls.size.value) ;
    this.formDataToSend.append('count' , this.myform2.controls.count.value) ;
    this.formDataToSend.append('service_type_id' , this.myform1.controls.service_type_id.value) ;
    this.formDataToSend.append('additional_service_id' , this.myform2.controls.additional_service_id.value) ;
    this.formDataToSend.append('description' , this.myform2.controls.description.value) ;
    this.formDataToSend.append('notes' , this.myform2.controls.notes.value) ;
    return this.ships_ser.add(this.formDataToSend).subscribe(res =>  {
      console.log(res);
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification ', detail: 'تم الاضافه  بنجاح'});
        setTimeout(() => {
          this.after()
        }, 1000);
      },err =>
      {
        console.log(err)
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification ', detail: 'يرجي التاكد من ادخال البيانات صحيحه'});
      }
      )
  }


  edit(id :any )
  {
    this.formDataToSend.append('name' , this.myform1.controls.name.value) ;
    this.formDataToSend.append('product_price' , this.myform1.controls.product_price.value) ;
    this.formDataToSend.append('sender_id' , this.myform1.controls.sender_id.value) ;
    this.formDataToSend.append('area_id' , this.myform1.controls.area_id.value) ;
    this.formDataToSend.append('name_shipment' , this.myform1.controls.name_shipment.value) ;
    this.formDataToSend.append('shipment_status_id' , this.myform1.controls.shipment_status_id.value) ;

    this.formDataToSend.append('address' , this.myform1.controls.address.value) ;
    this.formDataToSend.append('phone' , this.myform1.controls.phone.value) ;
    this.formDataToSend.append('order_number' , this.myform2.controls.order_number.value) ;
    this.formDataToSend.append('email2' , this.myform2.controls.email2.value) ;
    this.formDataToSend.append('customer_code' , this.myform2.controls.customer_code.value) ;
    this.formDataToSend.append('weight' , this.myform2.controls.weight.value) ;
    this.formDataToSend.append('size' , this.myform2.controls.size.value) ;
    this.formDataToSend.append('count' , this.myform2.controls.count.value) ;
    this.formDataToSend.append('service_type_id' , this.myform1.controls.service_type_id.value) ;
    this.formDataToSend.append('additional_service_id' , this.myform2.controls.additional_service_id.value) ;
    this.formDataToSend.append('description' , this.myform2.controls.description.value) ;
    this.formDataToSend.append('notes' , this.myform2.controls.notes.value) ;
    this.formDataToSend.append('description' , this.myform2.controls.description.value) ;
    // this.formDataToSend.append('name' , this.myform2.controls.name.value)
    debugger
    return this.ships_ser.edit_shipment(this.formDataToSend , id).subscribe(res =>  {
      console.log(res);
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification ', detail: 'تم التعديل علي الشحنه  بنجاح'});
        setTimeout(() => {
          this.after()

        }, 1000);
      },err =>
      {
        console.log(err)
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification ', detail: 'يرجي التاكد من ادخال البيانات صحيحه'});
      }
      )



  }




  receiver_id ;
  receiverData ;
  newReceiver  : boolean  = false  ;
  sendNumber()
  {
    return this.ships_ser.checkReciever({phone_number : this.myform4.controls.phone_number.value}).subscribe(res =>  {
      if(res == 0)
      {
        this.newReceiver = true ;
        // then this reciever not exist
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification ', detail: 'ناسف  , لا يوجد عميل بهذا الرقم , اذا كنت تريد انشاء مستلم اضغط انشاء مستلم'});

      }else{
        this.newReceiver = false ;
        this.receiverData = res  ;
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم تحديد المستلم '});
        this.receiver_id = res.id ;
        console.log(res);
      }
    })
  }


  add_edit2(modal){
    this.modal.open(modal,{ size: 'lg',keyboard : false ,backdrop : 'static' }) //, backdrop: 'static'

  }

  sendDataReceiver()
  {
    this.ships_ser.addReceiver(this.myfrom5.value).subscribe(res => {
      this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم اضافه المستلم '});
    })
  }



  provinces :any ;
  get_provinces()
  {
    this._province.get_All().subscribe(res => {
      this.provinces = res.provinces
    })
  }

  provinces_id :  any ;
  onProvinceChange(province_id : any )
  {

    this.provinces_id  =   province_id ;

    console.log(province_id);
    debugger
  if(province_id)
  {
    this._area.get_areaShipping(province_id).subscribe((res  : any ) =>  {
      debugger
      this.allareas = res.area;
    },err=> {
      console.log(err);

    })
  }
  }

  //new data after update
  after() {
    this.ships_ser.getAll(false  , '' , {}).subscribe(
      res=>{
        this.newData.emit(res.data?.shipment.data)
      }
    )
  }
}

