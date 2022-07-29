import { Router } from '@angular/router';

import { Component, NgModule, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WayService } from 'src/app/services/way.service';
import { Way } from 'src/app/shared/models/way';
import { Trans } from 'src/app/shared/models/trans';
import { TransportService } from 'src/app/services/transport.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-transport',
  templateUrl: './show-transport.component.html',
  styleUrls: ['./show-transport.component.css']
})
export class ShowTransportComponent implements OnInit {

  //For Get Data And Displed In DataTable
  ways_List: Trans[];

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:Trans
  permissions ;
  updatetransport_types : boolean = true  ;
  createtransport_types : boolean = true  ;
  constructor(private trans_ser:TransportService, private confirmationService: ConfirmationService,private x : MessageService , private  router:Router ,private modal:NgbModal, private toaster:ToastrService) {
      // check permissions  For USer
      if(JSON.parse(localStorage.getItem('employee')).permissions)
      {
       this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
      }
      if(this.permissions)
      {
        this.permissions.forEach(permission => {
             if(permission.name == 'update-transport_types')
         {
           this.updatetransport_types = true
         }
         if(permission.name == 'create-transport_types')
         {
           this.createtransport_types = true ;
         }
        });
      }

      if(!this.updatetransport_types || !this.createtransport_types){
        this.router.navigate(['/home'])
      }
  }

  ngOnInit(): void {
    this.getAll()
  }

  //get all
  getAll(){
    this.trans_ser.get_All().subscribe(
      res=>{
        this.ways_List=res.transport_type
      }
    )
  }

  //add_edit button
  add_edit(modal,obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
    console.log(this.catch_obj);
  }


  update(updateitmes){
    this.ways_List=updateitmes;
    this.modal.dismissAll()
  }


  clear(table: Table) {
    table.clear();
  }


  confirm(item:any) {


    this.confirmationService.confirm({
      message: 'هل تريد حذف وسيلة نقل ؟',
      accept: () => {
        this.trans_ser.delete_section(item).subscribe( (data) =>{
          console.log(data)
          this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف وسيلة نقل '});
          this.getAll();
        },err =>{
          this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف وسيلة نقل   '});

          console.log(err)
        })
      }
  });

    }


}
