import { MessageService, ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/shared/models/area';
import { Target } from '@angular/compiler';
import { ShipmentPlacesService } from 'src/app/services/shipment-places.service';
import { Ship } from 'src/app/shared/models/ship';
import { HttpClient } from '@angular/common/http';

@Component({
  providers :  [MessageService , ConfirmationService] ,
  selector: 'app-show-shipment',
  templateUrl: './show-shipment.component.html',
  styleUrls: ['./show-shipment.component.css']
})
export class ShowShipmentComponent implements OnInit {

  //For Get Data And Displed In DataTable
  target_List:any;

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:any
  permissions ;
  updateshipment_places : boolean = true ;
  createshipment_places : boolean = true ;
  constructor(
    private ship_ser:ShipmentPlacesService,
    private  router:Router  ,
    private modal:NgbModal,
    private toaster:ToastrService ,
    private acRoute:ActivatedRoute ,
    private _HttpClient:HttpClient ,
    private x : MessageService  ,
    private confirmationService : ConfirmationService
        ) {
      // check permissions  For USer
      if(JSON.parse(localStorage.getItem('employee')).permissions)
      {
       this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
      }
      if(this.permissions)
      {
        this.permissions.forEach(permission => {
             if(permission.name == 'update-shipment_places')
         {
           this.updateshipment_places = true
         }
         if(permission.name == 'create-shipment_places')
         {
           this.createshipment_places = true ;
         }
        });
      }

      if(!this.updateshipment_places || !this.createshipment_places )
      {
        this.router.navigate(['/home'])
      }
  }
  last_page:number;
  checkLinks:any[];
  page:number=1;
  sub:any;
  ngOnInit(): void {
  // if(this.page ==1 ){
  //   this.getFirstPage()
  // }
    this.sub = this.acRoute.paramMap.subscribe(params => {
      this.page = +params['page'] || 1;
      console.log(this.page)
    });

    this.getAll()
  }


  getAll(){
    this.ship_ser.get_All().subscribe(
      res=>{
        debugger
        console.log(res)
          this.target_List = res.shippingareaprice;
      }
    )
  }


nextButtontton:boolean=true;
preButton:boolean=false;
  // getFirstPage(){
  //   this.router.navigate(['/shipment_place'], { queryParams: { page: 1 } });
  //   this.getAll();
  // }


  nextPage(){
    // this.preButton = true
    // if(this.page < this.last_page){
    //   this.page ++;
    //   this.router.navigate(['shipment_place'], { queryParams: { page: this.page } });
    //   this.getAll();
    // } else if(this.page === this.last_page){
    //   this.nextButtontton =false;
    // }

    this.getAll();
  }


  prePage(){
    if(this.page > 1){
      this.page --;
      this.router.navigate(['shipment_place'], { queryParams: { page: this.page } });
      this.getAll();
      this.preButton =true;
    }
    else if(this.page === 2){
      this.preButton =false;
    }
  }

  //add_edit button
  add_edit(modal,obj){
    this.modal.open(modal, {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  update(updateitmes:any){
    this.target_List=updateitmes;
    this.modal.dismissAll()
  }




confirm(item:any) {
  this.confirmationService.confirm({
    message: 'هل تريد حذف هذه المنطقه ؟',
    accept: () => {
      this.ship_ser.delete_section(item).subscribe( (data) =>{
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف المنطقه'});
        this.getAll();
      },err =>{
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف المنطقه  '});

        console.log(err)
      })
    }
});

  }


  clear(table: Table) {
    table.clear();
  }
}


