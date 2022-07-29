import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-show-sales',
  templateUrl: './show-sales.component.html',
  styleUrls: ['./show-sales.component.css']
})
export class ShowSalesComponent implements OnInit {

  // catch_id:any
  all_sales:any[]=[]

  catch_obj:any=''
  createSales : boolean = true ;
  branches:any[]=[]
  //catch name from ser
  catch_name:any


  formData : FormGroup ;

  //pagination
  rows = 5;
  recourdNumber:number;
  constructor(private sales:SalesService , private modal:NgbModal ,  private epmloyee_ser:EmployeeService, private fb:FormBuilder ,   private x : MessageService ) { }

  ngOnInit(): void {
    this.get_sales() ;
    this.changePassForm();

  }


  changePassForm(){
    // this.user_id = this.client_id
   this.formData = this.fb.group({
        password   : [null , Validators.required] ,
        password_confirmation :[null , Validators.required] ,
      })
    }

  employee_id  ;
  //get it from routing\
  userName:string='';
  commissionDaily :number;
    get_sales(){
    this.sales.get_sales().subscribe(
      res=>{
        this.all_sales=res.map(item =>{


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



  changePassword(item){
    this.epmloyee_ser.changePassword(item).subscribe( data =>{

    })
  }


  user_id
  add_edit(modal , obj){
    debugger
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
    this.get_sales()
      this.user_id = obj.user_id
    }




  //after update
  after(event){
    this.all_sales=event ;
    this.get_sales()
    this.modal.dismissAll()
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
      this.get_sales() ;
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

}
