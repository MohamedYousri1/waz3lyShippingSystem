import { RolesService } from './../../services/roles.service';

import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { CatchItemService } from 'src/app/shared/catch-item.service';
import {MessageService} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'show-emps',
  templateUrl: './show-emps.component.html',
  styleUrls: ['./show-emps.component.css'],
})
export class ShowEmpsComponent implements OnInit {
  is_active:boolean = false;
  formData : FormGroup ;

  //For Get Data And Displed In DataTable
  employees_List:any[]=[];
  newPassword:number;
  changePass:number;
  //pagination
  rows = 5;
  recourdNumber:number;
  permissions ;
  updateemployee : boolean = true ;
  createemployee : boolean = true ;

  //catch obj to send
  Catch_obj:any
  flagup:boolean;

  constructor(private epmloyee_ser:EmployeeService,
              private modal:NgbModal,
              private catch_ser:CatchItemService,
              private  router:Router ,
              private x : MessageService ,
              private fb:FormBuilder ,
              private _role : RolesService
              ) {
      // check permissions  For USer
     if(JSON.parse(localStorage.getItem('employee')).permissions)
     {
      this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
     }
     if(this.permissions)
     {
       this.permissions.forEach(permission => {
            if(permission.name == 'update-employees')
        {
          this.updateemployee = true
        }
        if(permission.name == 'create-employees')
        {
          this.createemployee = true ;
        }
       });
     }
    //  if(!this.updateemployee || !this.createemployee )
    //  {
    //    this.router.navigate(['/home'])
    //  }
              }



  ngOnInit(): void {
    this.getAll()
    this.rolebuild() ;
    this.get_all_activated_roles()
    this.changePassForm();
  }
  commissionDaily:number
  name:string ='';
  nameList:string[]=[]
//get all fun
  getAll() {
    debugger
    this.epmloyee_ser.employ().subscribe(res => {
      console.log(res);
      this.employees_List=res.employees?.data?.map( item=>{
      //  this.commissionDaily = item.commission * item.user?.number_of_shipments_daily;
      //  item.allSal = this.commissionDaily
        return item
      })
    }
    );
  }
  changePassForm(){
    // this.user_id = this.client_id
   this.formData = this.fb.group({
        password   : [null , Validators.required] ,
        password_confirmation :[null , Validators.required] ,
      })
    }


  //add edit
  user_id;
  add_edit(modal, obj){
    this.modal.open(modal, {size:'lg' , backdrop : 'static',keyboard : false})
    this.Catch_obj= obj
    this.user_id = obj.user_id
    // console.log(this.user_id);


  }

  update(updateitmes:any){
    this.employees_List=updateitmes;
    this.getAll()
    this.modal.dismissAll()
  }


  //after update
  after(event){
    this.employees_List=event ;
    this.modal.dismissAll()
    this.getAll()
  }



  clear(table: Table) {
    table.clear();
  }


  changePassword(item){
    this.epmloyee_ser.changePassword(item).subscribe( data =>{

    })
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




  toggleButton(obj) {
    if(obj.user?.is_active === 0){
      this.active(obj);
    }else{
      this.de_active(obj);
    }
  }

  index: number
  delete(item:any){
      this.index= this.employees_List.indexOf(item);
    if (this.index !== -1) {
        this.employees_List.splice(this.index, 1);
        this.epmloyee_ser.delete_section(item).subscribe( (data) =>{
          this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: 'تم الحذف بنجاح'});

          return data;
        })
    }

}

turnClient()
  {
    this.formData.removeControl("user_id") ;
    this.formData.addControl("user_id" , this.fb.control(this.user_id)) ;
   if(this.user_id)
   {
     if(this.formData.value.password === this.formData.value.password_confirmation ){
      return this.epmloyee_ser.changePass(this.formData.value ).subscribe(res => {
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: ' تم تغيير كلمة السر بنجاح     '});
        console.log(res);
        this.getAll() ;
        this.modal.dismissAll()
      },(err=>{
        console.log(err)
        if(err.error?.password){
          this.x.add({key: 'Key2', severity:'error', summary: 'Notification', detail: err.error?.password});
        }
        else{
          this.x.add({key: 'Key2', severity:'info', summary: 'Notification', detail: 'يرجى التأكد من صحة البيانات'});
        }

      })) ;
     }else{
      this.x.add({key: 'Key2', severity:'info', summary: 'Notification', detail: ' تأكيد كلمة السر غير متطابق '});
     }

   }
  }


// Working on the Role
roleForm : any;
roleUserId : any ;
roleFormData  = new FormData();
allActivatedRoles : any ;

get_all_activated_roles()
{
  return this._role.get_all_Roles().subscribe((res  : any) =>  {
   this.allActivatedRoles  = res.roles ;
  })
}

add_edit_change(modal:any, employee:any )
{
  debugger
  this.modal.open(modal ,  {size:'xm' , backdrop : 'static',keyboard : false})
  this.roleUserId = employee.user_id ;

}

  // build form of change role
  rolebuild()
  {
    this.roleForm  = this.fb.group({
      role_id : [null , Validators.required]
    })
  }

  changeUserRole()
  {
    debugger
    this.roleFormData.append('role_id' , this.roleForm.controls.role_id.value ) ;
    this.roleFormData.append('user_id' , this.roleUserId) ;

    this.epmloyee_ser.changeRole(this.roleFormData).subscribe(res => {
      this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: 'Data Saved Successfully'});
      setTimeout(() => {
        this.getAll();
        this.modal.dismissAll();
      }, 1000);
    },error =>  {
      console.log(error);

      if(error.error.user_id)
      {
        this.x.add({key: 'myKey1', severity:'success', summary: 'Notification', detail: error.error.user_id[0]});

      }
    })
  }

  cancelRoleForm()
  {
    this.roleForm.reset() ;
    this.roleForm.controls.role_id.value  = null
  }

}


