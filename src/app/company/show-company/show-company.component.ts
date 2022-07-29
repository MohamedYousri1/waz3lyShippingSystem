import { ShipmentPlacesService } from 'src/app/services/shipment-places.service';
import { ClientsService } from './../../services/clients.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MessageService, ConfirmationService } from 'primeng/api';
@Component({
  providers : [MessageService , ConfirmationService] ,
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.css']
})
export class ShowCompanyComponent implements OnInit {
//pagination
rows = 5;
recourdNumber:number;
formData : FormGroup ;
user_id:number;
companyLists ;

//catch object to sent it to edit_add componet
catch_obj ;
permissions ;
updateclients : boolean = true ;
createclients : boolean = true ;
constructor(
  private company_serv:ClientsService,
  private fb:FormBuilder,
  private x : MessageService  ,
  private modal:NgbModal,
  private toastr:ToastrService ,
  private _area : ShipmentPlacesService ,
  private confirmationService : ConfirmationService ,
  private toster:ToastrService,

      ) {
   // check permissions  For USer
   if(JSON.parse(localStorage.getItem('employee')).permissions)
   {
    this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
   }
   if(this.permissions)
   {
     this.permissions.forEach(permission => {
          if(permission.name == 'update-clients')
      {
        this.updateclients = true
      }
      if(permission.name == 'create-clients')
      {
        this.createclients = true ;
      }
     });
   }
 }

ngOnInit(): void {
  this.getAll()
  this.changePassForm();
  this.weightFormBuild() ;
  this.build();
  this.get_areas();
}
changePassForm(){
  // this.user_id = this.client_id
 this.formData = this.fb.group({
      password   : [null , Validators.required] ,
      password_confirmation :[null , Validators.required] ,
    })
  }

// get passFo(){return this.passForm.controls}

//get All
getAll(){
  this.company_serv.getAllCompanies().subscribe(
    res=>{
      this.companyLists=res.companies
    }
  )
}

client_id ;
catch_obj2 :  any ;
//edit add function
add_edit(modal , obj){
  this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
  this.catch_obj=obj ;
  this.catch_obj2=obj ;
  this.user_id = obj.user_id ;
  // console.log(this.user_id)
}

moreDetails : any;
dataIsReady : boolean =  false ;
moreDetailsFun(modal : any  , obj )
{
  debugger
  this.moreDetails = null ;
  this.moreDetails = obj ;
  this.modal.open(modal , {size : 'lg' }) ;
  if(this.moreDetails != null && this.moreDetails != undefined)
  {
    this.dataIsReady = true ;
  }else
  {
    this.dataIsReady = false  ;
  }
}

//update
update(event){
  this.companyLists=event;
  this.modal.dismissAll()
}

  // active and de_active
  active(obj){
    debugger
     console.log('active');
     this.company_serv.active(obj).subscribe(
       res=>{
         console.log(res);
        //  this.x.add({key: 'Key1', severity:'success', summary: 'Notification', detail: 'تم الاستئناف بنجاح'});

       },err=>  {
         console.log(err);

       })
   }

   de_active(obj){
     debugger
     console.log('de_active');
     this.company_serv.de_active(obj).subscribe(
       res=>{
         console.log(res);
        //  this.x.add({key: 'Key1', severity:'success', summary: 'Notification', detail: 'تم الايقاف بنجاح'});
       }
     )
   }


   turnClient()
   {
     this.formData.removeControl("user_id") ;
     this.formData.addControl("user_id" , this.fb.control(this.user_id)) ;
    if(this.user_id)
    {
      if(this.formData.value.password === this.formData.value.password_confirmation ){
       return this.company_serv.changePass(this.formData.value ).subscribe(res => {
         this.x.add({key: 'pass', severity:'success', summary: 'Notification', detail: ' تم تغيير كلمة السر بنجاح     '});
         console.log(res);
         this.getAll() ;
         this.modal.dismissAll()
         this.formData.reset() ;
       },(err=>{
         console.log(err)
         if(err.error?.password){
           this.x.add({key: 'pass', severity:'error', summary: 'Notification', detail: err.error?.password});
         }
         else{
           this.x.add({key: 'pass', severity:'error', summary: 'Notification', detail: 'يرجى التأكد من صحة البيانات'});
         }
       })) ;
      }else{
       this.x.add({key: 'Key2', severity:'info', summary: 'Notification', detail: ' تأكيد كلمة السر غير متطابق '});
      }
    }
   }
  // Working on The Weight of all Companies
  weightForm : any;
  weightFormBuild()
  {
    this.weightForm = this.fb.group({
      limit : [null ,  Validators.required] ,
      price : [null ,  Validators.required]
    })
  }

  companyWeight_details : any[] = []  ;
  company_id :any   ;
  addWeight(modal  : any  , obj  : any )
{
  debugger
  this.company_id  = obj.id ;
  this.weightForm.reset() ;
  this.weightForm.removeControl('company_id')  ;
  this.weightForm.addControl('company_id' , this.fb.control(this.company_id))
  this.companyWeight_details = [] ;
  this.company_serv.get_company_weight(obj.id).subscribe((res  : any ) =>  {
    debugger
    this.companyWeight_details = res.weight_company ;
    console.log(res);
    // this.modal.open(modal , {size : 'lg' , backdrop : 'static' , keyboard :false }) ;
  },err=>  {
    console.log(err);
    this.companyWeight_details = [] ;
  },()=> {
    this.modal.open(modal , {size : 'lg' , backdrop : 'static' , keyboard :false }) ;
  })
}


// adding or updating The Weight
saveWeight()
{
debugger
this.weightForm.removeControl('company_id')  ;
this.weightForm.addControl('company_id' , this.fb.control(this.company_id))
  this.company_serv.add_weightCompany(this.weightForm.value).subscribe(res => {
  console.log(res);
    this.company_serv.get_company_weight(this.company_id).subscribe((res  : any ) =>  {
      debugger
      this.companyWeight_details = res.weight_company ;
      console.log(res);
      this.weightForm.reset()
      this.x.add({key: 'myKey5', severity:'success', summary: 'Notification', detail: 'تم الحفظ بنجاح'});
    },err=>  {
      console.log(err);
      this.companyWeight_details = [] ;
    },()=> {
    })
  },err=>  {
    console.log(err);
  })
}

selectedAreas : any[] = [] ;
// selectedAreasTest   = this.selectedAreas.split(',');



allAreas : any ;
get_areas()
{
  this._area.get_All().subscribe(res => {
    this.allAreas  = res.shippingareaprice ;
  })
}

saveAreas()
{
  debugger
  this.company_serv.addingAreas({areas_id : this.selectedAreas , company_id : this.company_id}).subscribe(res =>  {
    console.log(res );
    this.x.add({key: 'myKey5', severity:'success', summary: 'Notification', detail: 'تم الحفظ بنجاح'});
    this.modal.dismissAll() ;
    this.modal.dismissAll();
    this.getAll();
    this.selectedAreas = [];
  },err=>  {
    console.log(err);

  })
}

com_id :  any ;
addAreas(modal : any  ,  obj : any )
{

  this.company_id = obj.id;
  this.modal.open(modal  , {size : 'xs' , backdrop : 'static'  , keyboard : false });
}


areaDetails  : any[] = []  ;
editingareas(modal  :any   , obj : any )
{
  debugger
  this.com_id = obj.id ;
  if(obj.company_shipping_area_prices)
  {
    this.areaDetails = obj.company_shipping_area_prices ;
  }else
  {
    this.areaDetails = [] ;

  }
  this.modal.open(modal  , {size : 'lg'  , backdrop : 'static' , keyboard  : false });
}


area_id : any ;
rowId : any ;
editFormArea(modal  : any  , obj  : any )
{
  debugger
  this.catch_obj2 = obj  ;
  this.area_id = obj.area_id ;
  this.rowId = obj.id
  this.patchValue()
  this.modal.open(modal  , {size : 'lg'  , backdrop : 'static' , keyboard  : false });
}

myform: any ;
build(){
  this.myform=this.fb.group({
    transportation_price:[null, Validators.required],
    delivery_time:[null],
    returned_time:[null],
    save_for_all:[0],
  })
}
get f() {return this.myform.controls}
submited : boolean  = false ;
onsubmit(){
  this.submited=true
  if(this.myform.invalid){
    return
  }else
  {
    this.edit(this.rowId) ;
  }
}


toggleButton(obj) {
  if(obj.user?.is_active === 0){
    this.active(obj);
  }else{
    this.de_active(obj);
  }
}

  //edit funciton
  edit(id){
    debugger
    this.myform.removeControl('company_id') ;
    this.myform.addControl('company_id' , this.fb.control(this.com_id)) ;
    this.myform.removeControl('area_id') ;
    this.myform.addControl('area_id' , this.fb.control(this.area_id)) ;
    this.company_serv.editAreas(this.myform.value, id).subscribe(
      res=>{
        console.log(res);

        this.x.add({key: 'myKey1', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.getAll() ;
        this.modal.dismissAll() ;
        this.myform.reset() ;
      },err=>{
        if(err){
          console.log(err);
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
      transportation_price: this.catch_obj2.transportation_price,
      delivery_time: this.catch_obj2.delivery_time,
      returned_time: this.catch_obj2.returned_time,
    })
  }


confirm(item:any) {

  this.confirmationService.confirm({
    message: 'هل تريد حذف هذه المنطقه ؟',
    accept: () => {
      this.company_serv.delete_section(item).subscribe( (data) =>{
        this.x.add({key: 'myKey5', severity:'success', summary: 'Notification', detail: ' تم حذف المنطقه'});
        this.modal.dismissAll() ;
        this.getAll();
      },err =>{
        this.x.add({key: 'myKey5', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف المنطقه  '});
        console.log(err)
      })
    }
});

  }

target_List:any;
}
