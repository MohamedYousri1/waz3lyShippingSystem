
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AreasService } from 'src/app/services/areas.service';
import { Area } from 'src/app/shared/models/area';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-show-area',
  templateUrl: './show-area.component.html',
  styleUrls: ['./show-area.component.css']
})
export class ShowAreaComponent implements OnInit {

  //For Get Data And Displed In DataTable
  ways_List: any ;

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:Area
  permissions ;
  updateareas : boolean = true  ;
  createareas : boolean = true  ;
  constructor(private area_ser:AreasService,private  router:Router,  private modal:NgbModal, private toaster:ToastrService
    ,private confirmationService: ConfirmationService, private x : MessageService ) {
      // check permissions  For USer
      if(JSON.parse(localStorage.getItem('employee')).permissions)
      {
       this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
      }
      if(this.permissions)
      {
        this.permissions.forEach(permission => {
             if(permission.name == 'update-areas')
         {
           this.updateareas = true
         }
         if(permission.name == 'create-areas')
         {
           this.createareas = true ;
         }
        });
      }

      if(!this.updateareas || !this.createareas )
      {
        this.router.navigate(['/home'])
      }
  }
  ngOnInit(): void {
    this.getAll()
  }

  //get all
  getAll(){
    this.area_ser.get_All().subscribe(
      res=>{
        this.ways_List=res.areas
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
      message: 'هل تريد حذف المنطقه  ؟',
      accept: () => {
        this.area_ser.delete_section(item).subscribe( (data) =>{
          this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف المنطقه'});
          this.getAll();
        },err =>{
          this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف المنطقه  '});

          console.log(err)
        })
      }
  });

    }

}

