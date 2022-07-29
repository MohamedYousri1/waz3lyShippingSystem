import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BranchesService } from 'src/app/services/branches.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { RepresentativesDetailsService } from 'src/app/services/representatives-details.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { JobsService } from 'src/app/services/jobs.service';
import { DepartmentService } from 'src/app/department.service';
import { AreasService } from 'src/app/services/areas.service';
import { SupervisorsService } from 'src/app/services/supervisors.service';

@Component({
  selector: 'app-edit-add-super',
  templateUrl: './edit-add-super.component.html',
  styleUrls: ['./edit-add-super.component.css']
})
export class EditAddSuperComponent implements OnInit {
  ShowPassord: boolean = false;
  id;
  first_name: string;
  second_name: string;
  last_name: string;
  salary:string;
  national_id: string ;
  phone_number:string ;
  email: string;
  branch_id: any;
  department_id:any;
  job_id:any;
  is_shipping_representative:any ;
  is_supervisor:number= 1;
  is_sales;
  commission ;
  profile_pic: string;
  face_ID_card_pic:string;
  back_ID_card_pic :String
  resume_file: string;
  // qualification_file: string;
  password:any
  areas  : any;

  //two way binding
  @Input() Catchobj:any
  @Output() newData = new EventEmitter <any>()
  form: any ;

  branches:any[]=[]
  jobs:any[]=[]
  departments:any[]=[]
  constructor(private brach_ser:BranchesService,
              private emplyee_ser:EmployeeService,
              private jobs_ser:JobsService,
              private depart_Ser:DepartmentService,
              private _area:AreasService,
              private fb: FormBuilder,
              private toastr:ToastrService,
              private x : MessageService ,
              private super_ser :SupervisorsService
              ){}

              areasIds  : any[] = [] ;
  ngOnInit(){


    this.form = this.fb.group({
      areas:[null , Validators.required]
    })

    if(this.Catchobj){


     if(this.Catchobj.areas)
     {
      for(let i = 0 ;  i < parseInt(this.Catchobj.areas.length)  ; i++  )
      {
        this.areasIds.push(this.Catchobj.areas[i].id)
      }

     }
      this.form.patchValue({

        areas : this.areasIds
      })


      this.id=this.Catchobj.id,
      this.first_name=this.Catchobj.user?.first_name,
      this.second_name=this.Catchobj.user?.second_name,
      this.last_name=this.Catchobj.user?.last_name,
      this.salary = this.Catchobj.user?.salary;
      this.national_id=this.Catchobj.user?.national_id,
      this.phone_number=this.Catchobj.user?.phone_number,
      this.email=this.Catchobj.user?.email,
      this.branch_id=this.Catchobj.branch_id,
      this.department_id=this.Catchobj.department_id,
      this.job_id=this.Catchobj.job_id,
      this.is_shipping_representative=this.Catchobj.is_shipping_representative,
      // this.is_supervisor=this.Catchobj.is_supervisor,
      this.is_sales=this.Catchobj.is_sales,
      // this.areas = this.Catchobj.areas ;
      this.commission = this.Catchobj.commission ;
      this.profile_pic=this.Catchobj.user?.profile_pic_url,
      this.face_ID_card_pic=this.Catchobj.face_ID_card_pic_url,
      this.back_ID_card_pic=this.Catchobj.user?.back_ID_card_pic_url,
      this.resume_file=this.Catchobj.resume_file_url,
      // this.qualification_file=this.Catchobj.qualification_file_url
      this.password=this.Catchobj.user?.password
    }else{
      this.areasIds = [] ;
      this.first_name='',
      this.second_name='',
      this.last_name='',
      this.salary = null,
      this.national_id=null,
      this.phone_number=null,
      this.email='',
      this.branch_id=null,
      this.department_id=null,
      this.job_id=null,
      this.is_shipping_representative=null,
      // this.is_supervisor=null,
      this.is_sales=null,
      // this.areas = [] ;
      this.commission = 0 ,

      this.profile_pic='https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',

      this.face_ID_card_pic ='https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',

      this.back_ID_card_pic ='https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',

      this.resume_file='https://pngimg.com/uploads/cv/cv_PNG38.png',
      // this.qualification_file='https://svgsilh.com/svg/2428146.svg',
      this.password=""
    }

    this.get_branches();
    this.get_jobs();
    this.get_department();
    this.getAreas() ;
  }


  //new  here
  get_branches(){
    this.brach_ser.get_activated_branchs().subscribe(
      res=>{
        this.branches=res
      }
    )
  }

  get_jobs(){
    this.jobs_ser.get_Jobs().subscribe(
      res=>{
        this.jobs=res
      }
    )
  }

  get_department(){
    this.depart_Ser.getDepartment().subscribe(
      res=>{
        this.departments=res
      }
    )
  }

  allAreas ;
  getAreas()
  {
    return this._area.get_All().subscribe(res =>  {
      this.allAreas = res ;
    })
  }



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

 chnagedrop(e)
 {

   console.log(e.value);

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
      this.face_ID_card_pic=e.target.result;
      }
  }

  selectIdBack(event){
    this.selectBackId = event.target.files[0]
    let reader= new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload=(e:any)=>{
      this.back_ID_card_pic=e.target.result;
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



  // onsubmit
  onsubmit(){
    this.is_supervisor = 1

    if(this.selectedImage != null){
      this.formDataToSend.append("profile_pic", this.selectedImage ,  this.selectedImage.name);
    }
    if(this.selectFaceId != null){
      this.formDataToSend.append("face_ID_card_pic", this.selectFaceId ,  this.selectFaceId.name);
    }
    if(this.selectBackId != null){
      this.formDataToSend.append("back_ID_card_pic", this.selectBackId ,  this.selectBackId.name);
    }
    if(this.selectedResum != null){
      this.formDataToSend.append("resume_file", this.selectedResum ,  this.selectedResum.name);
    }



    this.formDataToSend.append("first_name",        this.first_name);
    this.formDataToSend.append("commission",       this.commission);
    this.formDataToSend.append("second_name",       this.second_name);
    this.formDataToSend.append("last_name",         this.last_name.toString());
      this.formDataToSend.append("salary", this.salary);

    this.formDataToSend.append("national_id",       this.national_id);
    this.formDataToSend.append("phone_number",      this.phone_number);
    this.formDataToSend.append("email",             this.email);
    this.formDataToSend.append("branch_id",         this.branch_id);
    this.formDataToSend.append("department_id",     this.department_id);
    this.formDataToSend.append("job_id",            this.job_id);
    this.formDataToSend.append("is_shipping_representative",  this.is_shipping_representative);
    this.formDataToSend.append("is_supervisor",  this.is_supervisor.toString());
    this.formDataToSend.append("is_sales",  this.is_sales);
    this.formDataToSend.append("password",  this.password);
// this.is_shipping_representative = true;
console.log(this.Catchobj)
    if(this.Catchobj === ""){
      this.add(this.formDataToSend)
    }else{
      this.edit(this.formDataToSend, this.id)
    }
  }
  // add function
  add(data:any){

    if(this.selectedImage == null)
    {
    this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'Plaese Choose Profile Picture'});
    }else

    {
      this.emplyee_ser.emp_register(data).subscribe(
        res=>{
          console.log(data)
          data.is_supervisor = this.is_supervisor
         this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
         console.log(res);
         setTimeout(() => {
           this.after()
         }, 1000);

        },err=>{
         console.log(err);
         if(err){
           if(err.error.email){
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' يرجي ادخال البريد الالكتروني والتاكد بعدم التكرار'});
           }else if(err.error.first_name)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الاسم الاول  '});
           }else if(err.error.password)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: `${err.error.password[0]}`});
           }
           else if(err.error.last_name)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الاسم الاخير  '});
           }
           else if(err.error.salary){
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال المرتب  '});
           }
           else if(err.error.profile_pic)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع صوره الموظف '});
           }
           else if(err.error.face_ID_card_pic)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع صوره وش البطاقة '});
           }

           else if(err.error.back_ID_card_pic)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع صوره ظهر البطاقة '});
           }
           // else if(err.error.qualification_file)
           // {
           //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع صوره مؤهل المؤهل  '});
           // }
           else if(err.error.resume_file)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع السيره الذاتيه  '});
           }else if(err.error.second_name)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الاسم الثاني  '});
           }

           else if(err.error.phone_number)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' يرجي ادخال  رقم الهاتف   والتاكد بعدم التكرار '});
           }

           else if(err.error.national_id)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الرقم القومي  والتاكد بعدم التكرار  '});
           }

           else if(err.error.password)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الرقم السري '});
           }

           else if(err.error.branch_id)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الفرع  '});
           }

           else if(err.error.department_id)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الاداره'});
           }

           else if(err.error.job_id)
           {
             this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الوظيفه'});
           }

           // else if(err.error.is_shipping_representative)
           // {
           //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي معرفه الموظف مندوب ام لا   '});
           // }
         }

       }
      )
    }


  }

  // edit function
  edit(data, id){
    if(this.selectedImage != null){
      this.formDataToSend.append("profile_pic", this.selectedImage ,  this.selectedImage.name);
    }

    if(this.selectFaceId != null){
      this.formDataToSend.append("face_ID_card_pic", this.selectFaceId ,  this.selectFaceId.name);
    }

    if(this.selectBackId != null){
      this.formDataToSend.append("back_ID_card_pic", this.selectBackId ,  this.selectBackId.name);
    }

    if(this.selectedResum != null){
      this.formDataToSend.append("resume_file", this.selectedResum ,  this.selectedResum.name);
    }

    this.formDataToSend.append("first_name",        this.first_name);

    this.formDataToSend.append("second_name",       this.second_name);
    this.formDataToSend.append("last_name",         this.last_name.toString());
    this.formDataToSend.append("salary",         this.salary);

    this.formDataToSend.append("national_id",       this.national_id);
    this.formDataToSend.append("phone_number",      this.phone_number);
    this.formDataToSend.append("email",             this.email);
    this.formDataToSend.append("branch_id",         this.branch_id);
    this.formDataToSend.append("department_id",     this.department_id);
    this.formDataToSend.append("job_id",            this.job_id);
    this.formDataToSend.append("is_shipping_representative",  this.is_shipping_representative.toString());
    // this.formDataToSend.append("is_supervisor",  this.is_supervisor);
    this.formDataToSend.append("is_sales",  this.is_sales);
    // this.formDataToSend.append("password",  this.password);

     this.emplyee_ser.emp_update(data, id).subscribe(
       res=>{
         this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
         setTimeout(()=>{
          this.after()
         },2000)
       },err=>{
        console.log(err);
        if(err){
          if(err.error.email){
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' يرجي ادخال البريد الالكتروني والتاكد بعدم التكرار'});
          }else if(err.error.first_name)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الاسم الاول  '});
          }
          else if(err.error.password)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: `${err.error.password[0]}`});
          }
          else if(err.error.last_name)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الاسم الاخير  '});
          }
         else if(err.error.profile_pic)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع صوره الموظف '});
          }

          else if(err.error.face_ID_card_pic)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع صوره الموظف '});
          }

          else if(err.error.back_ID_card_pic)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع صوره الموظف '});
          }
          // else if(err.error.qualification_file)
          // {
          //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع صوره مؤهل المؤهل  '});
          // }
          else if(err.error.resume_file)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع السيره الذاتيه  '});
          }else if(err.error.second_name)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الاسم الثاني  '});
          }

          else if(err.error.phone_number)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' يرجي ادخال  رقم الهاتف   والتاكد بعدم التكرار '});
          }

          else if(err.error.national_id)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الرقم القومي  والتاكد بعدم التكرار  '});
          }

          // else if(err.error.password)
          // {
          //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الرقم السري '});
          // }

          else if(err.error.branch_id)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الفرع  '});
          }

          else if(err.error.department_id)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الاداره'});
          }

          else if(err.error.job_id)
          {
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الوظيفه'});
          }

          // else if(err.error.is_shipping_representative)
          // {
          //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي معرفه الموظف مندوب ام لا   '});
          // }
        }
      }
     )
  }



  has_comission  :  boolean  = false ;

  //after updated
  after(){
    this.super_ser.get_supervisors().subscribe(
      res=>{
        console.log(res);
        this.newData.emit(res)
      }
    )
  }

  showPassword() {
    this.ShowPassord = !this.ShowPassord
  }


}





