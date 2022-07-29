import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from 'src/app/services/payment.service';
import { Pay } from 'src/app/shared/models/pay';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-payment',
  templateUrl: './show-payment.component.html',
  styleUrls: ['./show-payment.component.css']
})
export class ShowPaymentComponent implements OnInit {

  payList:Pay[]=[]

  //pagination
  rows = 5;
  recourdNumber:number;

  //catch object to sent it to eitd add
  catch_obj:any
  permissions ;
  updatepayment_types : boolean = true ;
  createpayment_types : boolean = true ;
  constructor(private pay_ser:PaymentService,private  router:Router , private modal:NgbModal ,private confirmationService: ConfirmationService, private x : MessageService) {
      // check permissions  For USer
      if(JSON.parse(localStorage.getItem('employee')).permissions)
      {
       this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
      }
      if(this.permissions)
      {
        this.permissions.forEach(permission => {
             if(permission.name == 'update-payment_types')
         {
           this.updatepayment_types = true
         }
         if(permission.name == 'create-payment_types')
         {
           this.createpayment_types = true ;
         }
        });
      }

      if(!this.updatepayment_types || !this.createpayment_types )
      {
        this.router.navigate(['/home'])
      }
   }

  ngOnInit(): void {
    this.getAll()
  }


  //get all
  getAll(){
    this.pay_ser.getAll().subscribe(
      res=>{
        this.payList=res.payment_type
      }
    )
  }

  //edit add
  add_edit(modal, obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false} )
    this.catch_obj=obj
  }

  //after update
  after(event){
    this.payList=event
    this.modal.dismissAll()
  }




confirm(item:any) {
  this.confirmationService.confirm({
    message: 'هل تريد حذف طريقه دفع ؟',
    accept: () => {
      this.pay_ser.delete_section(item).subscribe( (data) =>{
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف طريقه دفع'});
        this.getAll();
      },err =>{
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف طريقه دفع  '});

        console.log(err)
      })
    }
});

  }


}
