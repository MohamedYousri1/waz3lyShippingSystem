import { ProvincesService } from './../../services/provinces.service';
import { RepresentativeService } from './../../services/representative.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BranchesService } from 'src/app/services/branches.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { RepresentativesDetailsService } from 'src/app/services/representatives-details.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { JobsService } from 'src/app/services/jobs.service';
import { DepartmentService } from 'src/app/department.service';
import { AreasService } from 'src/app/services/areas.service';
@Component({
  selector: 'app-edit-add-res',
  templateUrl: './edit-add-res.component.html',
  styleUrls: ['./edit-add-res.component.css']
})
export class EditAddResComponent implements OnInit {
  ShowPassord: boolean = false;
  id;
  profile_pic: any ;
  fish_photo:any ;
  license_photo :any ;
  resume_file: any ;
  // qualification_file: any ;
  password:any
  areas  : any;

  //two way binding
  @Input() Catchobj:any = ''
  @Output() newData = new EventEmitter <any>()
  form: any ;

  branches:any[]=[]
  jobs:any[]=[]
  departments:any[]=[]
  constructor(private brach_ser:BranchesService,
              private emplyee_ser:RepresentativeService,
              private jobs_ser:JobsService,
              private depart_Ser:DepartmentService,
              private _area:AreasService,
              private fb: FormBuilder,
              private toastr:ToastrService,
              private x : MessageService ,
              private  _representative : RepresentativesDetailsService ,
              private _province  : ProvincesService ,

              ){}

  ngOnInit(){
    this.mainFormBuild() ;
    if (this.Catchobj) {
      this.id=this.Catchobj.id
      this.patchValud()
    }else{
      this.id=''
    }

    // this.getAreas() ;
    this.get_branches() ;
    this.get_department() ;
    this.get_provinces()
  }


  //new  here
  get_branches(){
    this.brach_ser.get_branchs().subscribe(
      res=>{
        this.branches=res.branches
      }
    )
  }

  get_jobs(){
    this.jobs_ser.get_Jobs().subscribe(
      res=>{
        this.jobs=res.jobs
      }
    )
  }

  get_department(){
    this.depart_Ser.getDepartment().subscribe(
      res=>{
        this.departments=res.departments
      }
    )
  }

  allAreas ;
  // getAreas()
  // {
  //   return this._area.get_All().subscribe(res =>  {
  //     this.allAreas = res.areas.data ;
  //   })
  // }



  salarySec:boolean = false;
  commSec:boolean = false;
  onSwap(item:any){
    console.log(item.value)
    if(item.value == 1){
      this.salarySec = true ;
      this.commSec = false;

    }else if(item.value == 2){
      this.salarySec = false ;
      this.commSec = true;

    }else if(item.value == 3){
      this.salarySec = true ;
      this.commSec = true;
    }


  }


  formDataToSend= new FormData()//this is parent to send
  // profile img
  selectedImage
  selectFaceId;
  selectBackId;

  selectImg(event){
    this.selectedImage=event.target.files[0]
    // console.log(this.selectedImage);
    let reader= new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload=(e:any)=>{
    this.profile_pic=e.target.result;
    }
  }

  selectIdFace(event){
    this.selectFaceId = event.target.files[0]
    let reader= new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload=(e:any)=>{
      this.fish_photo=e.target.result;
      }
  }

  selectIdBack(event){
    this.selectBackId = event.target.files[0]
    let reader= new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload=(e:any)=>{
      this.license_photo=e.target.result;
      }
  }

  //select resum
  selectedResum
  selectResum(event){
    this.selectedResum=event.target.files[0]
    let reader= new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload=(e:any)=>{
    this.resume_file=e.target.result;
    }
  }



  mainForm : any ;
  mainFormBuild()
  {
    this.mainForm = this.fb.group({
      name   : [null , Validators.required] ,
      email   : [null , [Validators.email , Validators.required]] ,
      password   : [null , Validators.required] ,
      password_confirmation   : [null , Validators.required] ,
      salary   : [null , Validators.required] ,
      commission   : [null , Validators.required] ,

      address   : [null , Validators.required] ,
      phone_number   :  [null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/gm)]],
      // branch_id   : [null] ,
      // department_id   : [null] ,
      // job_id   : [null] ,
      national_id   : [null , Validators.required] ,
      city_id   : [null , Validators.required] ,

    })
  }

  patchValud()
  {
    debugger
    if(this.Catchobj.area?.province_id)
    {
      this.onProvinceChange(this.Catchobj.area?.province_id) ;
    }
    if(this.Catchobj.photo)
    {
      this.profile_pic = this.Catchobj.image_path
    }else
    {
      this.profile_pic = '../../../assets/images/placehold.jpg' ;
    }

    if(this.Catchobj.cv)
    {
      this.selectedResum = this.Catchobj.cv
    }

    if(this.Catchobj.fish_photo)
    {
      this.fish_photo = this.Catchobj.fish_photo_path
    }else
    {
      this.fish_photo = '../../../assets/images/placehold.jpg' ;
    }

    if(this.Catchobj.license_photo)
    {
      this.license_photo = this.Catchobj.license_photo_path
    }else
    {
      this.license_photo = '../../../assets/images/placehold.jpg' ;
    }
    this.onProvinceChange(this.Catchobj.citie?.governorate_id);

    this.mainForm.patchValue({
      name   : this.Catchobj.name ,
      email   : this.Catchobj.user?.email ,
      password   : this.Catchobj.password ,
      password_confirmation   : this.Catchobj.password_confirmation ,
      salary   : this.Catchobj.salary ,
      commission   : this.Catchobj.user?.user_data?.commission ,

      address   : this.Catchobj.address ,
      phone_number   : this.Catchobj.user?.phone_number ,
      // branch_id   : this.Catchobj.branch_id ,
      // department_id   : this.Catchobj.department_id ,
      // job_id   : this.Catchobj.job_id ,
      national_id   : this.Catchobj?.national_id ,
      city_id   : this.Catchobj.city_id ,

    })

  }
  get f(){ return this.mainForm.controls}
  // onsubmit
  submited : boolean = false ;
  onsubmit(){
    debugger
    this.submited = true ;

    if(this.mainForm.valid)
    {
      if(this.Catchobj === ""){
        this.add()
      }else{
        this.edit(this.id)
      }
    }

  }
  // add function
  add(){

    if(this.selectedImage == null){
       this.x.add({key: 'myKeys1', severity:'error', summary: 'Notification', detail: 'يرجي رفع الصوره الشخصيه '});
    }
    else if(this.selectFaceId == null){
       this.x.add({key: 'myKeys1', severity:'error', summary: 'Notification', detail: 'يرجي رفع الفيش الجنائي'});
    }
    else if(this.selectBackId == null){
       this.x.add({key: 'myKeys1', severity:'error', summary: 'Notification', detail: ' يرجي رفع صةره للرخصه '});
    }
    else if(this.selectedResum == null){
       this.x.add({key: 'myKeys1', severity:'error', summary: 'Notification', detail: 'يرجي رفع السيره الزاتيه '});
    }else
    {
      this.formDataToSend.append("photo", this.selectedImage ,  this.selectedImage.name);
      this.formDataToSend.append("fish_photo", this.selectFaceId ,  this.selectFaceId.name);
      this.formDataToSend.append("license_photo", this.selectBackId ,  this.selectBackId.name);
      this.formDataToSend.append("cv", this.selectedResum ,  this.selectedResum.name);

      this.formDataToSend.append("name", this.mainForm.controls.name.value);
      this.formDataToSend.append("national_id", this.mainForm.controls.national_id.value);
      this.formDataToSend.append("city_id", this.mainForm.controls.city_id.value);
      this.formDataToSend.append("phone_number", this.mainForm.controls.phone_number.value);
      this.formDataToSend.append("email", this.mainForm.controls.email.value);
      this.formDataToSend.append("password",  this.mainForm.controls.password.value);
      this.formDataToSend.append("salary",  this.mainForm.controls.salary.value);
      this.formDataToSend.append("commission",  this.mainForm.controls.commission.value);
      this.formDataToSend.append("address",  this.mainForm.controls.address.value);
      this.formDataToSend.append("password_confirmation",  this.mainForm.controls.password_confirmation.value);
       this.emplyee_ser.emp_register(this.formDataToSend).subscribe(
        res=>{

         this.x.add({key: 'myKeys1', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
         console.log(res);
         setTimeout(() => {
           this.after()
         }, 1000);
        },err=>{
         console.log(err);
         if(err){
           if(err.error?.errors?.cv)
           {
            this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error?.errors?.cv[0] });
           }else if(err.error?.errors?.cv)
           {
            this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error?.errors?.photo[0] });
           }
           else if(err.error.errors?.email){
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error?.errors?.email[0] });
           }else if(err.error.errors?.name)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail:err.error?.errors?.name[0]});
           }else if(err.error.errors?.password)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: `${err.error?.errors?.password[0]}`});
           }
           else if(err.error.errors?.salary){
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال المرتب  '});
           }
           else if(err.error.errors?.commission){
            this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال العموله  '});
          }
           else if(err.error.errors?.profile_pic)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error.errors?.profile_pic[0]});
           }
           else if(err.error.errors?.fish_photo)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error.errors?.fish_photo[0]});
           }

           else if(err.error.errors?.license_photo)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error.errors?.license_photo[0]});
           }
           else if(err.error.errors?.resume_file)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error.errors?.resume_file[0]});
           }
           else if(err.error.errors?.phone_number)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail:  err.error.errors?.phone_number[0]});
           }

           else if(err.error.errors?.national_id)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error.errors?.national_id[0]});
           }

           else if(err.error.errors?.password)
           {
            for(let i =0  ; i < err.error.errors?.password.length  ; i++ )
            {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: `${err.error.errors?.password[i]}`});
            }
           }

          //  else if(err.error.errors?.branch_id)
          //  {
          //    this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الفرع  '});
          //  }

          //  else if(err.error.errors?.department_id)
          //  {
          //    this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الاداره'});
          //  }

   }
       }
      )

    }




  }

  // edit function
  edit(id){
    if(this.selectedImage == null){
      this.x.add({key: 'myKeys1', severity:'error', summary: 'Notification', detail: 'يرجي رفع الصوره الشخصيه '});
   }
   else if(this.selectFaceId == null){
      this.x.add({key: 'myKeys1', severity:'error', summary: 'Notification', detail: 'يرجي رفع الفيش الجنائي'});
   }
   else if(this.selectBackId == null){
      this.x.add({key: 'myKeys1', severity:'error', summary: 'Notification', detail: ' يرجي رفع صةره للرخصه '});
   }
   else if(this.selectedResum == null){
      this.x.add({key: 'myKeys1', severity:'error', summary: 'Notification', detail: 'يرجي رفع السيره الزاتيه '});
   }else
   {


    this.formDataToSend.append("photo", this.selectedImage ,  this.selectedImage.name);
    this.formDataToSend.append("fish_photo", this.selectFaceId ,  this.selectFaceId.name);
    this.formDataToSend.append("license_photo", this.selectBackId ,  this.selectBackId.name);
    this.formDataToSend.append("cv", this.selectedResum ,  this.selectedResum.name);

    this.formDataToSend.append("name", this.mainForm.controls.name.value);
    this.formDataToSend.append("national_id", this.mainForm.controls.national_id.value);
    this.formDataToSend.append("city_id", this.mainForm.controls.city_id.value);
    this.formDataToSend.append("phone_number", this.mainForm.controls.phone_number.value);
    this.formDataToSend.append("email", this.mainForm.controls.email.value);
    this.formDataToSend.append("password",  this.mainForm.controls.password.value);
    this.formDataToSend.append("salary",  this.mainForm.controls.salary.value);
    this.formDataToSend.append("commission",  this.mainForm.controls.commission.value);
    this.formDataToSend.append("address",  this.mainForm.controls.address.value);
    this.formDataToSend.append("password_confirmation",  this.mainForm.controls.password_confirmation.value);

    this.emplyee_ser.emp_update(this.formDataToSend, id).subscribe(
      res=>{

        console.log(res);
        this.x.add({key: 'myKeys1', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
     this.after()
  },err=>{
         console.log(err);
         if(err){
           if(err.error?.errors?.cv)
           {
            this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error?.errors?.cv[0] });
           }else if(err.error?.errors?.cv)
           {
            this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error?.errors?.photo[0] });
           }
           else if(err.error.errors?.email){
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error?.errors?.email[0] });
           }else if(err.error.errors?.name)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail:err.error?.errors?.name[0]});
           }else if(err.error.errors?.password)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: `${err.error?.errors?.password[0]}`});
           }
           else if(err.error.errors?.salary){
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال المرتب  '});
           }
           else if(err.error.errors?.commission){
            this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال العموله  '});
          }
           else if(err.error.errors?.profile_pic)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error.errors?.profile_pic[0]});
           }
           else if(err.error.errors?.fish_photo)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error.errors?.fish_photo[0]});
           }

           else if(err.error.errors?.license_photo)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error.errors?.license_photo[0]});
           }
           else if(err.error.errors?.resume_file)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error.errors?.resume_file[0]});
           }
           else if(err.error.errors?.phone_number)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail:  err.error.errors?.phone_number[0]});
           }

           else if(err.error.errors?.national_id)
           {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: err.error.errors?.national_id[0]});
           }

           else if(err.error.errors?.password)
           {
            for(let i =0  ; i < err.error.errors?.password.length  ; i++ )
            {
             this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: `${err.error.errors?.password[i]}`});
            }
           }

          //  else if(err.error.errors?.branch_id)
          //  {
          //    this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الفرع  '});
          //  }

          //  else if(err.error.errors?.department_id)
          //  {
          //    this.x.add({key: 'myKeys1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الاداره'});
          //  }

   }
       }
    )
   }

  }



  has_comission  :  boolean  = false ;

//   onchoose(item  :any ){
//     debugger
//     console.log(item.value)


//     if(item.value == 0 )
//     {
//       this.is_shipping_representative = true ;
//       // this.is_supervisor = false ;
//       // this.is_sales = false ;
//       // this.has_comission = true ;
//     }
//     // else if (item.value == 1 )
//     // {

//     //   this.is_shipping_representative = false  ;
//     //   this.is_supervisor = true  ;
//     //   this.is_sales = false ;
//     //   this.has_comission = true ;



//     // }else if (item.value == 2 )
//     // {
//     //   this.is_shipping_representative = false  ;
//     //   this.is_supervisor = false ;
//     //   this.is_sales = true  ;
//     //   this.has_comission = false  ;
//     //   this.commission = 0  ;
//     // }
// }

  //after updated
  after(){
    this.emplyee_ser.get_represenative().subscribe(
      res=>{
        console.log(res);
        this.newData.emit(res.representative)
      }
    )
  }

  showPassword() {
    this.ShowPassord = !this.ShowPassord
  }


  provinces :any ;
  get_provinces()
  {
    this._province.get_ProvincesReady().subscribe(res => {
      this.provinces = res.governorate
    })
  }




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





