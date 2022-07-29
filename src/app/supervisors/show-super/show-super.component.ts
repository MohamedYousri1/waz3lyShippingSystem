import { Component, OnInit } from '@angular/core';
import { RepresentativesDetailsService } from 'src/app/services/representatives-details.service';
import { CatchItemService } from 'src/app/shared/catch-item.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { SupervisorsService } from 'src/app/services/supervisors.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-super',
  templateUrl: './show-super.component.html',
  styleUrls: ['./show-super.component.css']
})
export class ShowSuperComponent implements OnInit {
  formData : FormGroup ;
  newPassword:number;
  changePass:number;
  constructor( private modal:NgbModal, private epmloyee_ser:EmployeeService,  private catch_ser:CatchItemService,  private  supervisors: SupervisorsService ,    private x : MessageService ,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
    this. get_supervisors()
    this.changePassForm();

  }

    // all variables Here
    allSupervisors ;
    userName:string='';
    commissionDaily :number;

      //catch obj to send
  Catch_obj:any

  get_supervisors()
    {
      return  this.supervisors.get_supervisors().subscribe
        (res =>  {
        this.allSupervisors =  res.map(item =>{
          // console.log(res);
          // console.log(item.user?.first_name);

          if(item.user?.first_name == undefined && item.user?.second_name == undefined && item.user?.last_name == undefined ){
            this.userName = ' '
          }else{
            this.userName = item.user?.first_name + ' ' + item.user?.second_name + ' ' + item.user?.last_name
          }

          this.userName = item.user?.first_name + ' ' + item.user?.second_name + ' ' + item.user?.last_name

        this.commissionDaily = item.commission * item.user?.number_of_shipments_daily;
        item.allSal = this.commissionDaily
        // console.log(this.commissionDaily)
          item.userName  = this.userName
          // console.log(item.username)
          // console.log(this.userName)

          return item;

        })
      })
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
    this.get_supervisors()
    this.Catch_obj= obj
    this.user_id = obj.user_id
  }

  update(updateitmes:any){
    this.allSupervisors=updateitmes;
    this.get_supervisors()

    this.modal.dismissAll()
  }


  changePassword(item){
    this.epmloyee_ser.changePassword(item).subscribe( data =>{

    })
  }


  //after update
  after(event){
    this.allSupervisors=event ;
    this.modal.dismissAll()
    this.get_supervisors();
  }

  clear(table: Table) {
    table.clear();
  }


    ///active and de_active
    active(obj){
      // this.is_active = !this.is_active;
       console.log('active');
       this.epmloyee_ser.active(obj).subscribe(
         res=>{
           console.log(res);
         }
       )
     }

     de_active(obj){
      //this.is_active = !this.is_active;
       console.log('de_active');
       this.epmloyee_ser.de_active(obj).subscribe(
         res=>{
           console.log(res);
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
      this.get_supervisors() ;
      this.modal.dismissAll()
    },(err=>{
      console.log(err)
      if(err.error){
        this.x.add({key: 'Key2', severity:'info', summary: 'Notification', detail: 'لا يمكن تعديل كلمة السر'});
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



}
