import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Ship } from 'src/app/shared/models/ship';
import { ShipmentTypesService } from 'src/app/services/shipment-types.service';
import { ShipType } from 'src/app/shared/models/ship-type';

@Component({
  providers : [MessageService  , ConfirmationService] ,
  selector: 'app-show-additional-services',
  templateUrl: './show-additional-services.component.html',
  styleUrls: ['./show-additional-services.component.css']
})
export class ShowAdditionalServicesComponent implements OnInit {

  //For Get Data And Displed In DataTable
  List:ShipType[]=[];

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:any
  permissions ;
  updateshipment_types : boolean = true ;
  createshipment_types : boolean = true ;
  constructor(
    private ship_ser:ShipmentTypesService,
    private  router:Router  ,
    private modal:NgbModal,
    private toaster:ToastrService ,
    private confirmationService : ConfirmationService ,
    private x : MessageService
    ) {
      // check permissions  For USer
      if(JSON.parse(localStorage.getItem('employee')).permissions)
      {
       this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
      }
      if(this.permissions)
      {
        this.permissions.forEach(permission => {
             if(permission.name == 'update-shipment_types')
         {
           this.updateshipment_types = true
         }
         if(permission.name == 'create-shipment_types')
         {
           this.createshipment_types = true ;
         }
        });
      }

      if(!this.updateshipment_types || !this.createshipment_types )
      {
        this.router.navigate(['/home'])
      }
  }
  ngOnInit(): void {
    this.getAll()
  }

  //get all
  getAll(){
    this.ship_ser.get_AdditionalServices().subscribe(
      res=>{
        this.List=res.additional_service ;
      }
    )
  }

  //add_edit button
  add_edit(modal,obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  update(updateitmes:any){
    this.List=updateitmes;
    this.modal.dismissAll()
  }


  clear(table: Table) {
    table.clear();
  }



confirm(item:any) {
  this.confirmationService.confirm({
    message: 'هل تريد الحذف ؟',
    accept: () => {
      this.ship_ser.delete_AdditionalService(item).subscribe( (data) =>{
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم الحذف بنجاح'});
        this.getAll();
      },err =>{
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكنك الحذف  '});

        console.log(err)
      })
    }
});

  }
}
