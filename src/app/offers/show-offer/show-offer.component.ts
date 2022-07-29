import { OfferService } from './../../services/offer.service';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Component, OnInit } from '@angular/core';
@Component({
  providers : [MessageService , ConfirmationService] ,
  selector: 'app-show-offer',
  templateUrl: './show-offer.component.html',
  styleUrls: ['./show-offer.component.css']
})
export class ShowOfferComponent implements OnInit {

  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  //For Pathing Data To Add Edit Component


  //For Get Data And Displed In DataTable
  offerList: any;

  //pagination
  rows = 5;
  recourdNumber:number;

  //catch id to send it to modal
  catch_obj:any
  permissions ;
  updatejob : boolean = true ;
  createjob : boolean = true ;
  constructor(private _offer:OfferService, private confirmationService: ConfirmationService, private  router:Router ,private modal:NgbModal,private x : MessageService , private toaster:ToastrService) {
        // check permissions  For USer
        if(JSON.parse(localStorage.getItem('employee')).permissions)
        {
         this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
        }
        if(this.permissions)
        {
          this.permissions.forEach(permission => {
               if(permission.name == 'update-jobs')
           {
             this.updatejob = true
           }
           if(permission.name == 'create-jobs')
           {
             this.createjob = true ;
           }
          });
        }
        // if(!this.updatejob || !this.createjob )
        // {
        //   this.router.navigate(['/home'])
        // }
  }


  ngOnInit(): void {
    this.getPickups();
  }



  getPickups(){
    this._offer.get_offers().subscribe((res   : any ) =>{
      debugger
      this.offerList=res.offer
    })
  }

  edit_add(modal , obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }

  after(event){
    this.offerList=event
    this.modal.dismissAll()
  }

  clear(table: Table) {
    table.clear();
  }
confirm(item:any) {
  this.confirmationService.confirm({
    message: 'هل تريد حذف العرض',
    accept: () => {
      this._offer.delete_section(item).subscribe( (data) =>{
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف العرض'});
        this.getPickups();
      },err =>{
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف العرض  '});
        console.log(err)
      })
    }
});
  }



  moreDetails : any;
dataIsReady : boolean =  false ;
moreDetailsFun(modal : any  , obj )
{
  debugger
  this.moreDetails = null ;
  this.moreDetails = obj.company ;
  this.modal.open(modal , {size : 'lg' }) ;
  if(this.moreDetails != null && this.moreDetails != undefined)
  {
    this.dataIsReady = true ;
  }else
  {
    this.dataIsReady = false  ;
  }
}




}
