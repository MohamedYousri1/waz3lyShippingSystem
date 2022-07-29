import { Router } from '@angular/router';
import { Component, NgModule, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Sec } from '../../shared/models/sec';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionsService } from 'src/app/services/sections.service';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';


@Component({
  providers : [MessageService] ,
  selector: 'app-show-sec',
  templateUrl: './show-sec.component.html',
  styleUrls: ['./show-sec.component.css']
})
export class ShowSecComponent implements OnInit {


  //For Get Data And Displed In DataTable
  sectionsList: any ;

  //pagination
  rows = 5;
  recourdNumber:number;

  //catch objc to send it to modal
  catch_obj:Sec
  permissions ;
  updateDepartment : boolean = true ;
  createDepartment : boolean = true ;

  constructor(private sec_ser:SectionsService,private  router:Router , private modal:NgbModal ,   private x : MessageService ,
    private confirmationService: ConfirmationService) {
    // check permissions  For USer
     if(JSON.parse(localStorage.getItem('employee')).permissions)
     {
      this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
     }
     if(this.permissions)
     {
       this.permissions.forEach(permission => {
            if(permission.name == 'update-departments')
        {
          this.updateDepartment = true
        }
        if(permission.name == 'create-departments')
        {
          this.createDepartment = true ;
        }
       });
     }
    //  if(!this.updateDepartment || !this.createDepartment )
    //  {
    //    this.router.navigate(['/home'])
    //  }
    //this.recourdNumber = this.sectionsList.length;
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.sec_ser.get_sections().subscribe((res : any ) =>{
      this.sectionsList=res.departments
      // console.log(this.sectionsList);
    })
  }
  add_edit(modal, obj){
    this.modal.open(modal, {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  //after updated
  update(newItems){
    this.sectionsList=newItems
    this.modal.dismissAll()
  }



  confirm(item:any) {
    this.confirmationService.confirm({
      message: 'هل تريد حذف الادارة ؟',
      accept: () => {
        this.sec_ser.delete_section(item).subscribe(res => {
          this.x.add({key: 'myKey8', severity:'success', summary: 'Notification', detail: ' تم حذف الاداره'});
          this.getAll() ;
        },err=>  {
          console.log(err);

          if(err.error == 'no delete')
          {
          console.log('ennter here ')
            this.x.add({key: 'myKey8', severity:'error', summary: 'Notification', detail: '  لا يمكن حذف الادارة'});
          }
        });
      }
  });

    }



  clear(table: Table) {
    table.clear();
  }


}
