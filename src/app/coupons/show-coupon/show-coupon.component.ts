import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-show-coupon',
  templateUrl: './show-coupon.component.html',
  styleUrls: ['./show-coupon.component.css']
})
export class ShowCouponComponent implements OnInit {
  //pagination
  rows = 5;
  recourdNumber:number;

  //object list
  coupons_List:any[]=[]
  selectedMembers:any
  //catch obj to sent it to child comp
  catch_obj:any
  permissions ;
  updatecoupons : boolean = false ;
  createcoupons : boolean = false ;
  constructor(private moal:NgbModal, private  router:Router ,private coup_ser:CouponsService ,
    private confirmationService: ConfirmationService, private x : MessageService ) {
     // check permissions  For USer
     if(JSON.parse(localStorage.getItem('employee')).permissions)
     {
      this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
     }
     if(this.permissions)
     {
       this.permissions.forEach(permission => {
            if(permission.name == 'update-coupons')
        {
          this.updatecoupons = true
        }
        if(permission.name == 'create-coupons')
        {
          this.createcoupons = true ;
        }
       });
     }

     if(!this.updatecoupons || !this.createcoupons )
     {
       this.router.navigate(['/home'])
     }
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.coup_ser.getAll().subscribe(
      res=>{
        this.coupons_List=res
        this.selectedMembers = this.coupons_List

      }
    )
  }

  add_edit(modal , obj){
    this.moal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj;
    this.getAll()

  }

  //after updated
  after(e){
    this.coupons_List=e;
    this.moal.dismissAll()
  }


  getDate(start: Date, end: Date) {
    start = new Date(start)
    end = new Date(end);
      this.selectedMembers = this.coupons_List.filter(m => {
        // m.from = new Date(m.from);
        // m.to = new Date(m.to);
        if (( new Date(m.start_date) > start &&  new Date(m.start_date) < end) || (new Date(m.end_date) > start && new Date(m.end_date) < end)) {
          return m ;
        }

      }
      );

    }



confirm(item:any) {


  this.confirmationService.confirm({
    message: 'هل تريد حذف كوبون؟',
    accept: () => {
      this.coup_ser.delete_section(item).subscribe( (data) =>{
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف كوبون'});
        this.getAll();
      },err =>{
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف كوبون  '});

        console.log(err)
      })
    }
});

  }



}
