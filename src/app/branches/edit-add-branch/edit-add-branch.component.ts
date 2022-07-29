
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BranchesService } from 'src/app/services/branches.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { AreasService } from 'src/app/services/areas.service';

import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
    selector: 'app-edit-add-branch',
    templateUrl: './edit-add-branch.component.html',
    styleUrls: ['./edit-add-branch.component.css']
  })

  export class EditAddBranchComponent implements OnInit {
    address: string;
    email: string;
    employee_id: number;
    area_id:number
    id:number=0;
    google_location:string;
    name: string;
    phone: string;
    // profile_pic:any;


    //two way binding
    @Input() Catchobj:any
    @Output() newData = new EventEmitter <any>()


    // employees:any[]=[]
    areas:any[]=[]
    constructor(private brach_ser:BranchesService,
                // private emplyee_ser:EmployeeService,
                private areas_ser:AreasService,
                private toastr:ToastrService ,
                private x : MessageService ,
                ){}
    ngOnInit(){
      if(this.Catchobj){
        this.address=this.Catchobj.address,
        this.email=this.Catchobj.email,
        this.employee_id=this.Catchobj.employee_id,
        this.area_id=this.Catchobj.area_id,
        this.id=this.Catchobj.id,
        this.google_location=this.Catchobj.location,
        this.name=this.Catchobj.name,
        this.phone=this.Catchobj.phone
        // this.profile_pic=this.Catchobj.url
      }else{
        this.address='',
        this.email='',
        this.employee_id=null,
        this.area_id=null,
        this.id=null,
        this.google_location='',
        this.name='',
        this.phone=''
        // this.profile_pic=''
      }

      // this.get_emp();
      this.get_branches()
    }


    //new  here
    get_branches(){
      this.areas_ser.get_All().subscribe(
        res=>{
          this.areas=res.areas
        }
      )
    }
    // get_emp(){
    //   this.emplyee_ser.employ().subscribe(
    //     res=>{
    //       this.employees=res
    //       console.log(res);
    //     }
    //   )
    // }

    // here
    selectedImage
    formDataToSend= new FormData()
    //select Img
    // selectImg(event){
    //   this.selectedImage=event.target.files[0]
    //   console.log(this.selectedImage);
    //   let reader= new FileReader();
    //   reader.readAsDataURL(event.target.files[0])
    //   reader.onload=(e:any)=>{
    //   this.profile_pic=e.target.result;
    //   }
    // }

    // onsubmit
    onsubmit(){
      // if(this.selectedImage != null){
      //   this.formDataToSend.append("profile_pic", this.selectedImage ,  this.selectedImage.name);
      // }

      if(this.Catchobj === ""){
        this.add()
      }else{
        this.edit(this.id)
      }
    }
    // add function
    add(){
      debugger
      if(this.name == null || this.name.trim() == '' || this.name == undefined )
      {
        this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال إسم الفرع'});
      }else if (this.address == null || this.address == '' || this.address == undefined )
      {
        this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال عنوان الفرع'});
      }else if (this.phone  == null || this.phone  == '' || this.phone  == undefined)
      {
        this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال تليفون الفرع'});
      }else if (this.area_id  == null || this.area_id  == undefined)
      {
        this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إختيار المنطقه التابع لها الفرع'});
      }else{
        debugger
        this.formDataToSend.append("address",     this.address);
        this.formDataToSend.append("email",       this.email);
        // this.formDataToSend.append("employee_id", this.employee_id.toString());
        this.formDataToSend.append("area_id",     this.area_id.toString());
        this.formDataToSend.append("name",        this.name);
        this.formDataToSend.append("location",        this.google_location);
        this.formDataToSend.append("phone",       this.phone);
        this.brach_ser.add_branch(this.formDataToSend).subscribe(
          res=>{
            console.log(res)
           this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
           setTimeout(() => {
             this.after()
           }, 1000);

          },(err)=>{
            console.log(err);
            if(err){
              if(err.error?.errors.name){
                this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
              }else if(err.error?.errors.phone)
              {
               this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.phone[0]}`});
              }else if(err.error?.errors.email)
              {
               this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.email[0]}`});
              }else if(err.error?.errors.address)
              {
               this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.address[0]}`});
              }else if(err.error?.errors.location)
              {
               this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.location[0]}`});
              }
            }

          }
        )
      }

    }

    // edit function
    edit(id){
      debugger
      if(this.name == null || this.name.trim() == '' || this.name == undefined )
      {
        this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال إسم الفرع'});
      }else if (this.address == null || this.address == '' || this.address == undefined )
      {
        this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال عنوان الفرع'});
      }else if (this.phone  == null || this.phone  == '' || this.phone  == undefined)
      {
        this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال تليفون الفرع'});
      }else if (this.area_id  == null || this.area_id  == undefined)
      {
        this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إختيار المنطقه التابع لها الفرع'});
      }else{
        debugger
        this.formDataToSend.append("address",     this.address);
        this.formDataToSend.append("email",       this.email);
        // this.formDataToSend.append("employee_id", this.employee_id.toString());
        this.formDataToSend.append("area_id",     this.area_id.toString());
        this.formDataToSend.append("name",        this.name);
        this.formDataToSend.append("location",        this.google_location);
        this.formDataToSend.append("phone",       this.phone);

        this.brach_ser.edit_branch(this.formDataToSend, id).subscribe(
          res=>{
            console.log(res);
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
         this.after()
          },(err)=>{
           console.log(err);
           if(err){
             if(err.error?.errors.name){
               this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
             }else if(err.error?.errors.phone)
             {
              this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.phone[0]}`});
             }else if(err.error?.errors.email)
             {
              this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.email[0]}`});
             }else if(err.error?.errors.address)
             {
              this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.address[0]}`});
             }else if(err.error?.errors.location)
             {
              this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.location[0]}`});
             }
           }

         }
        )
      }
    }

    //after updated
    after(){
      this.brach_ser.get_branchs().subscribe(
        res=>{
          this.newData.emit(res.branches)
        }
      )
    }



  }





