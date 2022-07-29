import { RolesService } from './../../services/roles.service';
import { ProvincesService } from 'src/app/services/provinces.service';
import { StoragesService } from 'src/app/services/storages.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { BranchesService } from 'src/app/services/branches.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { AreasService } from 'src/app/services/areas.service';
import { JobsService } from 'src/app/services/jobs.service';
import { DepartmentService } from 'src/app/department.service';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService],
  selector: 'edit-add-emp',
  templateUrl: './edit-add-emp.component.html',
  styleUrls: ['./edit-add-emp.component.css']
})
  export class EditAddEmpComponent implements OnInit {
    ShowPassord: boolean = false;
    id;
    name: string;
    salary:string;
    phone_number:string ;
    address:string ;
    email: string;
    branch_id: any;
    // store_id: any;
    city_id : any ;
    province_id : any ;
    role_id : any ;

    department_id:any;
    job_id:any;
    is_shipping_representative:any;
    is_supervisor:any;
    is_sales;
    commission ;
    profile_pic: string;
    face_ID_card_pic:string;
    back_ID_card_pic :String
    resume_file: string;
    // qualification_file: string;
    password:any
    password_confirmation :any ;
    areas  : any;
    @Input() flag:boolean = true;
    //two way binding
    @Input() Catchobj:any
    @Output() newData = new EventEmitter <any>()
    form: any ;
    branches:any[]=[] ;
    stores:any[]=[] ;

    jobs:any[]=[]
    departments:any[]=[]
    constructor(
            private brach_ser:BranchesService,
            private emplyee_ser:EmployeeService,
            private jobs_ser:JobsService,
            private depart_Ser:DepartmentService,
            private _area:AreasService,
            private fb: FormBuilder,
            private toastr:ToastrService,
            private x : MessageService ,
            private store : StoragesService ,
            private _province  : ProvincesService ,
            private _role : RolesService ,
                ){}
                areasIds  : any[] = [] ;
    ngOnInit(){
      // this.onSwap(1) ;
      this.get_all_activated_roles();
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
        debugger
        if(this.Catchobj.area?.province_id)
        {
          this.onProvinceChange(this.Catchobj.area?.province_id) ;
        }
        this.form.patchValue({
          areas : this.areasIds
        })
        debugger
        this.id=this.Catchobj.id,
        this.name=this.Catchobj?.name,
        this.salary = this.Catchobj.salary;
        this.phone_number=this.Catchobj.user?.phone_number,
        this.address=this.Catchobj?.address,
        this.email=this.Catchobj.user?.email,
        this.branch_id=this.Catchobj.branch_id,
        // this.store_id=this.Catchobj.store_id,
        this.city_id = this.Catchobj.city_id ;
        debugger
        this.province_id = this.Catchobj.citie?.governorate_id ;
        this.role_id = this.Catchobj.role_id ;

        this.department_id=this.Catchobj.department_id,
        this.job_id=this.Catchobj.job_id,
        this.is_shipping_representative=this.Catchobj.is_shipping_representative,
        this.is_supervisor=this.Catchobj.is_supervisor,
        this.is_sales=this.Catchobj.is_sales,
        this.commission = this.Catchobj.commission ;
        debugger
        this.profile_pic=this.Catchobj?.image_photo,
        this.face_ID_card_pic=this.Catchobj.image_face,
        this.back_ID_card_pic=this.Catchobj?.image_back,
        this.resume_file=this.Catchobj.image_cv,
        this.password=this.Catchobj.user?.password
        this.password_confirmation=this.Catchobj.user?.password_confirmation
      }else{
        this.areasIds = [] ;
        this.name='',
        this.salary = null,
        this.phone_number=null,
        this.address=null,
        this.email='',
        this.branch_id=null,
        // this.store_id=null,
        this.city_id = null ;
        this.province_id = null ;
        this.role_id = null ;

        this.department_id=null,
        this.job_id=null,
        this.is_shipping_representative=null,
        this.is_supervisor=null,
        this.is_sales=null,
        // this.areas = [] ;
        this.commission = 0 ,
        this.profile_pic='https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
        this.face_ID_card_pic ='../../../assets/images/NationalID-1.jpg',
        this.back_ID_card_pic ='../../../assets/images/NationalID-1.jpg',
        this.resume_file='https://pngimg.com/uploads/cv/cv_PNG38.png',
        //this.qualification_file='https://svgsilh.com/svg/2428146.svg',
        this.password="" ;
        this.password_confirmation = ""
      }
      this.get_branches();
      this.get_stores();
      this.get_jobs();
      this.get_department();
      this.get_provinces() ;
    }


    allActivatedRoles :any ;
    get_all_activated_roles()
    {
      return this._role.get_all_Roles().subscribe((res : any ) =>  {
       this.allActivatedRoles  = res.roles ;
      })
    }



    //new  here
    get_branches(){
      this.brach_ser.get_branchs().subscribe(
        res=>{
          this.branches=res.branches
        }
      )
    }

    // Function To Get All Stores  in system
    get_stores(){
      this.store.get_All().subscribe(
        res=>{
          this.stores=res.store
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
    //     this.allAreas = res.areas ;
    //   })
    // }

    // form data form here
    //select Img
    // tempArr: any = { "areas": [] };

    // onChangearea(event, area: any){ // Use appropriate model type instead of any
    //   this.tempArr.areas.push(area.id);

    // }


  //   onCbChange(e) {
  //     debugger
  //     const areas: FormArray = this.form.get('areas') as FormArray;

  //     if (e.target.checked) {
  //       areas.push(new FormControl(e.target.value));
  //     } else {
  //       let i: number = 0;
  //       areas.controls.forEach((item: FormControl) => {
  //         if (item.value == e.target.value) {
  //           areas.removeAt(i);
  //           return;
  //         }
  //         i++;
  //       });
  //     }
  //  }
   chnagedrop(e)
   {
     debugger
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
    //select qllie
    // selected_qulie
    // selectQulie(event){
    //   this.selected_qulie=event.target.files[0]
    //   let reader= new FileReader();
    //   reader.readAsDataURL(event.target.files[0])
    //   reader.onload=(e:any)=>{
    //   this.qualification_file=e.target.result;
    //   }
    // }
    // onsubmit
    onsubmit(){
      debugger
      if(this.selectedImage != null){
        this.formDataToSend.append("photo", this.selectedImage ,  this.selectedImage.name);
      }
      if(this.selectFaceId != null){
        this.formDataToSend.append("face_ID_card_pic", this.selectFaceId ,  this.selectFaceId.name);
      }
      if(this.selectBackId != null){
        this.formDataToSend.append("back_ID_card_pic", this.selectBackId ,  this.selectBackId.name);
      }
      if(this.selectedResum != null){
        this.formDataToSend.append("cv", this.selectedResum ,  this.selectedResum.name);
      }
      // if(this.selected_qulie != null){
      //   this.formDataToSend.append("qualification_file", this.selected_qulie ,  this.selected_qulie.name);
      // }
      if((this.is_shipping_representative != null && this.is_shipping_representative != '' && this.is_shipping_representative != 0)  || (this.is_supervisor != null && this.is_supervisor != '' && this.is_supervisor != 0  ))
      {
        this.formDataToSend.append("areas",  this.form.controls.areas.value);
        this.formDataToSend.append("commission", this.commission);
      }else
      {
        this.formDataToSend.append("areas",  null);
        this.formDataToSend.append("commission",       null);
      }
      this.formDataToSend.append("name",        this.name);
      this.formDataToSend.append("commission",       this.commission);
        this.formDataToSend.append("salary", this.salary);
      this.formDataToSend.append("phone_number",      this.phone_number);
      this.formDataToSend.append("role_id",      this.role_id);

      this.formDataToSend.append("address",      this.address);
      this.formDataToSend.append("branch_id",      this.branch_id);
      // this.formDataToSend.append("store_id",      this.store_id);
      this.formDataToSend.append("city_id",      this.city_id);
      this.formDataToSend.append("email",             this.email);
      this.formDataToSend.append("department_id",     this.department_id);
      this.formDataToSend.append("job_id",            this.job_id);
      this.formDataToSend.append("is_shipping_representative",  this.is_shipping_representative);
      this.formDataToSend.append("is_supervisor",  this.is_supervisor);
      this.formDataToSend.append("is_sales",  this.is_sales);
      this.formDataToSend.append("password",  this.password);
      this.formDataToSend.append("password_confirmation",  this.password_confirmation);
      if(this.Catchobj === ""){
        this.add(this.formDataToSend)
      }else{
        this.edit(this.formDataToSend, this.id)
      }
    }
    // add function
    add(data:any){
      if(this.email.trim() == ''){
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' يرجي ادخال البريد الالكتروني والتاكد بعدم التكرار'});
      }else if(this.name.trim() == '')
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الاسم الاول  '});
      }else if(this.password == null  || this.password == undefined )
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: `يرجي إدخال كلمه السر`});
      }
      else if(this.password_confirmation == null  || this.password_confirmation == undefined )
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: `يرجي  تاكيد  كلمه السر`});
      }
      else if(this.salary == ''){
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال المرتب  '});
      }
      else if(this.phone_number == '')
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' يرجي ادخال  رقم الهاتف   والتاكد بعدم التكرار '});
      }
      else if(this.address == '')
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' يرجي ادخال  العنوان '});
      }
      else if(this.password == '')
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الرقم السري '});
      }
      else if(this.branch_id == null )
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الفرع  '});
      }
      // else if(this.store_id == null )
      // {
      //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار المخزن  '});
      // }
      else if(this.department_id == null || this.department_id == undefined )
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار القسم '});
      }
      else if(this.job_id == null || this.job_id == undefined )
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الوظيفه'});
      }else if(this.city_id == '')
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار المنطقه'});
      }else if(this.selectedImage == null){
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الصوره الشخصيه'});
      }
      else if(this.selectFaceId == null){
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار صوره وش البطاقه'});
      }
      else if(this.selectBackId == null){
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار صوره ظهر البطاقه'});
      }
      else if(this.selectedResum == null){
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي رفع السيره الزاتيه'});
      }
      else
      {
        this.emplyee_ser.emp_register(data).subscribe(
          res=>{
            debugger
          console.log(this.formDataToSend);
           this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
           console.log(res);
           setTimeout(() => {
             this.after()
           }, 1000);
          },err=>{
           console.log(err);
            if(err.error?.errors?.address)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.address[0]}`});
            }else if(err.error?.errors?.back_ID_card_pic)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.back_ID_card_pic[0]}`});
            }else if(err.error?.errors?.branch_id)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.branch_id[0]}`});
            }else if(err.error?.errors?.city_id)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.city_id[0]}`});
            }else if(err.error?.errors?.cv)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.cv[0]}`});
            }else if(err.error?.errors?.department_id)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.department_id[0]}`});
            }else if(err.error?.errors?.email)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.email[0]}`});
            }else if(err.error?.errors?.face_ID_card_pic)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.face_ID_card_pic[0]}`});
            }else if(err.error?.errors?.job_id)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.job_id[0]}`});
            }else if(err.error?.errors?.name)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.name[0]}`});
            }
            else if(err.error?.errors?.password)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.password[0]}`});
            }else if(err.error?.errors?.phone_number)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.phone_number[0]}`});
            }
            else if(err.error?.errors?.role_id)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.role_id[0]}`});
            }

            else if(err.error?.errors?.photo)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.photo[0]}`});
            }else if(err.error?.errors?.salary)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.salary[0]}`});
            }
         }
        )
      }
    }

    // edit function
    edit(data, id){
      if(this.email.trim() == ''){
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' يرجي ادخال البريد الالكتروني والتاكد بعدم التكرار'});
      }else if(this.name.trim() == '')
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الاسم الاول  '});
      }
      // else if(this.password == null  || this.password == undefined )
      // {
      //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: `يرجي إدخال كلمه السر`});
      // }
      else if(this.salary == ''){
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال المرتب  '});
      }
      else if(this.phone_number == '')
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' يرجي ادخال  رقم الهاتف   والتاكد بعدم التكرار '});
      }else if(this.address == '')
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' يرجي ادخال  العنوان '});
      }
      // else if(this.password == '')
      // {
      //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي ادخال الرقم السري '});
      // }
      else if(this.branch_id == null )
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الفرع  '});
      }
      // else if(this.store_id == null )
      // {
      //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار المخزن  '});
      // }
      else if(this.department_id == null || this.department_id == undefined )
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الاداره'});
      }
      else if(this.job_id == null || this.job_id == undefined )
      {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي اختيار الوظيفه'});
      }
      else
      {
        this.emplyee_ser.emp_update(data, id).subscribe(
          res=>{
            console.log(res);
            this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
         this.after()
        },err=>{
          console.log(err);
           if(err.error?.errors?.address)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.address[0]}`});
           }else if(err.error?.errors?.back_ID_card_pic)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.back_ID_card_pic[0]}`});
           }else if(err.error?.errors?.branch_id)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.branch_id[0]}`});
           }else if(err.error?.errors?.city_id)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.city_id[0]}`});
           }else if(err.error?.errors?.cv)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.cv[0]}`});
           }else if(err.error?.errors?.department_id)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.department_id[0]}`});
           }else if(err.error?.errors?.email)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.email[0]}`});
           }else if(err.error?.errors?.face_ID_card_pic)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.face_ID_card_pic[0]}`});
           }else if(err.error?.errors?.job_id)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.job_id[0]}`});
           }else if(err.error?.errors?.name)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.name[0]}`});
           }
           else if(err.error?.errors?.password)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.password[0]}`});
           }else if(err.error?.errors?.phone_number)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.phone_number[0]}`});
           }
           else if(err.error?.errors?.role_id)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.role_id[0]}`});
           }
           else if(err.error?.errors?.photo)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.photo[0]}`});
           }else if(err.error?.errors?.salary)
           {
             this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.errors?.salary[0]}`});
           }
        }
        )
      }
    }
    has_comission  :  boolean  = false ;
    onchoose(item  :any ){
      console.log(item.value)
      if(item.value == 0 )
      {
        this.is_shipping_representative = true ;
        this.is_supervisor = false ;
        this.is_sales = false ;
        this.has_comission = true ;
      }else if (item.value == 1 )
      {

        this.is_shipping_representative = false  ;
        this.is_supervisor = true  ;
        this.is_sales = false ;
        this.has_comission = true ;
      }else if (item.value == 2 )
      {
        this.is_shipping_representative = false  ;
        this.is_supervisor = false ;
        this.is_sales = true  ;
        this.has_comission = false  ;
        this.commission = 0  ;
      }
  }

  salarySec:boolean = false;
  commSec:boolean = false;
  onSwap(item:any){
    debugger
    console.log(item)
    if(item == 1){
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

    //after updated
    after(){
      this.emplyee_ser.employ().subscribe(
        res=>{
          console.log(res);
          this.newData.emit(res.employees?.data)
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





