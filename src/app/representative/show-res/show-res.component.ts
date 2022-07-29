import { ShipmentTypesService } from './../../services/shipment-types.service';
import { AreasService } from './../../services/areas.service';
import { ProvincesService } from './../../services/provinces.service';
import { RepresentativeService } from './../../services/representative.service';
import { Component, OnInit } from '@angular/core';
import { RepresentativesDetailsService } from 'src/app/services/representatives-details.service';
import { CatchItemService } from 'src/app/shared/catch-item.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';


@Component({
  providers :  [MessageService , ConfirmationService] ,
  selector: 'app-show-res',
  templateUrl: './show-res.component.html',
  styleUrls: ['./show-res.component.css']
})
export class ShowResComponent implements OnInit {
  newPassword:number;
  changePass:number;
  constructor(
    private modal:NgbModal,
    private epmloyee_ser:RepresentativeService,
    private catch_ser:CatchItemService,
    private  _representative : RepresentativesDetailsService ,
    private x : MessageService ,
    private fb:FormBuilder ,
    private _province : ProvincesService ,
    private _area : AreasService ,
    private servTypes : ShipmentTypesService

    ) { }

  ngOnInit(): void {
    this.get_all_representatives()
    this.changePassForm();
    this.get_provinces();
    this.get_serviceTypes()
    this.build() ;
    this.getAreasForAll() ;

  }
    // all variables Here
    allRepresentatives ;
    userName:string='';
    commissionDaily :number;
      //catch obj to send
  Catch_obj:any
    get_all_representatives()
    {
      return this.epmloyee_ser.get_represenative().subscribe(res =>  {
        this.allRepresentatives = res.representative  ;
      })
    }
  //add edit
 user_id;
  add_edit(modal, obj){
    this.modal.open(modal, {size:'lg' , backdrop : 'static',keyboard : false})
    this.get_all_representatives()
    this.Catch_obj= obj
    this.user_id = obj.user_id
    // console.log(obj)


  }

  changePassword(item){
    this.epmloyee_ser.changePassword(item).subscribe( data =>{

    })
  }

  //after update
  after(event){
    this.allRepresentatives=event ;
    this.modal.dismissAll()
  }

  clear(table: Table) {
    table.clear();
  }


    // active and de_active
    active(obj){
      debugger
       console.log('active');
       this.epmloyee_ser.active(obj).subscribe(
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
       this.epmloyee_ser.de_active(obj).subscribe(
         res=>{
           console.log(res);
          //  this.x.add({key: 'Key1', severity:'success', summary: 'Notification', detail: 'تم الايقاف بنجاح'});
         }
       )
     }

     formData : FormGroup ;
     changePassForm(){
     this.formData = this.fb.group({
          password   : [null , Validators.required] ,
          password_confirmation :[null , Validators.required] ,
        })
      }

     toggleButton(obj) {
       if(obj.user?.is_active === 0){
         this.active(obj);
       }else{
         this.de_active(obj);
       }
     }


    testFormData  =  new FormData() ;

    turnClient()
    {
      this.formData.removeControl("user_id") ;
      this.formData.addControl("user_id" , this.fb.control(this.user_id)) ;
     if(this.user_id)
     {
       if(this.formData.value.password === this.formData.value.password_confirmation ){
        return this.epmloyee_ser.changePass(this.formData.value ).subscribe(res => {
          this.x.add({key: 'pass', severity:'success', summary: 'Notification', detail: ' تم تغيير كلمة السر بنجاح'});
          console.log(res);
          this.modal.dismissAll()
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
     myform3 :any ;
     build() {
      this.myform3 = this.fb.group({
        date_representative_area:this.fb.array([]),
      });
     }

     get date_representative_area() : FormArray {
      return this.myform3.get("date_representative_area") as FormArray
    }

    new_areaPrice(): FormGroup {
      return this.fb.group({
        receipt_commission: '',
        return_commission : [null , Validators.required],
        // replacement_price : [null, Validators.required],
        area_id : [null , Validators.required],
        province_id : [null],
        service_type_id : [null , Validators.required],
        representative_id : [this.representative_id],

      })
    }


    add_comp_products() {
      this.date_representative_area.push(this.new_areaPrice());
      console.log(this.date_representative_area);
    }
    remove_comp_product(i:number) {
      this.date_representative_area.removeAt(i);
    }


    representativeSpec : any[] = [] ;
    representative_id : any ;
     representativeAreas(modal : any , representativeData : any)
     {
      this.date_representative_area.clear()
       this.representativeSpec = [] ;
       debugger
      this.representative_id = representativeData.id ;
      this.representativeSpec = this.allAreasForAllReps.filter(ele => {return ele.representative_id == this.representative_id}) ;
      console.log( this.representativeSpec);
       this.modal.open(modal , {size : 'lg' , backdrop : 'static' , keyboard : false }) ;
       this.representativeSpec.forEach((ele , index) => {
         debugger
         this.add_comp_products() ;
         this.onProvinceChange(ele.area?.province_id)
         debugger
        this.new_areaPrice().patchValue({
          receipt_commission: ele.receipt_commission,
          return_commission : ele.return_commission ,
          area_id : ele.area_id ,
          province_id : ele.area?.province_id ,
          service_type_id : ele.service_type_id ,
      })
  });

    this.myform3.patchValue({
      date_representative_area : this.representativeSpec,
    })

    // this.date_representative_area.controls.length  = this.representativeSpec.length
     }

     provinces :any ;
     get_provinces()
     {
       this._province.get_All().subscribe(res => {
         this.provinces = res.provinces
       })
     }

     allAreas :any ;
     onProvinceChange(province_id : any )
     {
       console.log(province_id);

       debugger
     if(province_id)
     {
       this._area.get_area_inProvince(province_id).subscribe((res  : any ) =>  {
         debugger
         this.allAreas = res.area  ;
       },err=> {
         console.log(err);
       })
     }
     }


     serviceTypes :any ;
    get_serviceTypes()
    {
      return this.servTypes.get_All().subscribe(res => {
        this.serviceTypes = res.service_type ;
      })
    }


    allAreasForAllReps  :any[] ;
    getAreasForAll()
    {
      this._representative.getAreaPrice().subscribe((res:any) => {
        this.allAreasForAllReps  = res.representative_area ;
      })
    }

    saveAreas()
    {
      this.date_representative_area
      this._representative.saveAreaPrice(this.myform3.value).subscribe(res => {
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: 'تم الحفظ بنجاح'});
        this.modal.dismissAll();
        this.get_all_representatives();
        this.getAreasForAll();
      },err=> {
       if(err == "Http failure response for https://waz3ly.net/dashboard/api/dashboard/representative-area: 422 OK")
        {
          this.x.add({key: 'Key2', severity:'error', summary: 'Notification', detail: 'يجب استكمال البيانات '});
        }else
        {
          console.log(err);
        }
      })
    }
}
