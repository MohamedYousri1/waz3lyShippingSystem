
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/shared/models/area';
import { ClientTypesService } from 'src/app/services/client-types.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-client-types',
  templateUrl: './show-client-types.component.html',
  styleUrls: ['./show-client-types.component.css']
})
export class ShowClientTypesComponent implements OnInit {

  //For Get Data And Displed In DataTable
  ways_List: Area[];

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:Area
  permissions ;
  updateclient_types : boolean = false ;
  createclient_types : boolean = false ;
  constructor(private Client_t_ser:ClientTypesService, private  router:Router,private modal:NgbModal, private toaster:ToastrService ,private confirmationService: ConfirmationService, private x : MessageService) {
     // check permissions  For USer
     if(JSON.parse(localStorage.getItem('employee')).permissions)
     {
      this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
     }
     if(this.permissions)
     {
       this.permissions.forEach(permission => {
            if(permission.name == 'update-client_types')
        {
          this.updateclient_types = true
        }
        if(permission.name == 'create-client_types')
        {
          this.createclient_types = true ;
        }
       });
     }


     if(!this.updateclient_types || !this.createclient_types )
     {
       this.router.navigate(['/home'])
     }
  }
  ngOnInit(): void {
    this.getAll()
  }

  //get all
  getAll(){
    this.Client_t_ser.get_All().subscribe(
      res=>{
        this.ways_List=res
      }
    )
  }

  //add_edit button
  add_edit(modal,obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
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
      message: 'هل تريد حذف نوع عميل  ؟',
      accept: () => {
        this.Client_t_ser.delete_section(item).subscribe( (data) =>{
          this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف نوع عميل'});
          this.getAll();
        },err =>{
          this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف نوع عميل  '});

          console.log(err)
        })
      }
  });

    }

}


