import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProvincesService } from 'src/app/services/provinces.service';
import { Prov } from 'src/app/shared/models/prov';
import { CountriesService } from 'src/app/services/countries.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-show-prov',
  templateUrl: './show-prov.component.html',
  styleUrls: ['./show-prov.component.css']
})
export class ShowProvComponent implements OnInit {
  //For Get Data And Displed In DataTable
  ways_List:Prov[];
  countries:any [];
  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:Prov
  permissions ;
  updateprov : boolean = true ;
  createprov : boolean = true ;
  constructor(private prov_ser:ProvincesService,
      private modal:NgbModal,
      private toaster:ToastrService,
      private country_ser:CountriesService,
      private  router:Router
      ,private confirmationService: ConfirmationService, private x : MessageService
      ){
          // check permissions  For USer
          if(JSON.parse(localStorage.getItem('employee')).permissions)
          {
           this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
          }
          if(this.permissions)
          {
            this.permissions.forEach(permission => {
                 if(permission.name == 'update-provinces')
             {
               this.updateprov = true
             }
             if(permission.name == 'create-provinces')
             {
               this.createprov = true ;
             }
            });
          }


      if(!this.updateprov || !this.createprov )
      {
        this.router.navigate(['/home'])
      }
      }
  ngOnInit(): void {
    this.getAll()
  }


  //get all
  getAll(){
    this.prov_ser.get_All().subscribe(
      res=>{
        this.ways_List=res.provinces
      }
    )
  }

  //add_edit button
  add_edit(modal,obj){
    this.modal.open(modal , {size:'xm' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  update(updateitmes:any){
    this.ways_List=updateitmes;
    this.modal.dismissAll()
  }


  clear(table: Table) {
    table.clear();
  }


  confirm(item:any) {
    this.confirmationService.confirm({
      message: 'هل تريد حذف محافظه  ؟',
      accept: () => {
        this.prov_ser.delete_section(item).subscribe( (data) =>{
          this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف محافظه '});
          this.getAll();
        },err =>{
          this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف محافظه   '});
          console.log(err)
        })
      }
  });
    }
}

