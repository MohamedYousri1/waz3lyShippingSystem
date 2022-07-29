import { ConfirmationService, MessageService } from 'primeng/api';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { BranchesService } from 'src/app/services/branches.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { CatchItemService } from 'src/app/shared/catch-item.service';
import { Branch } from 'src/app/shared/models/branch';
import { IEmployee } from 'src/app/shared/models/employee';

@Component({
  providers :  [ConfirmationService  , MessageService] ,
  selector: 'app-show-branch',
  templateUrl: './show-branch.component.html',
  styleUrls: ['./show-branch.component.css']
})
export class ShowBranchComponent implements OnInit {


  //For Get Data And Displed In DataTable
  branchList: any ;

  //pagination
  rows = 5;
  recourdNumber:number;
  permissions ;
  updatebranche : boolean = true ;
  createbranche : boolean = true ;

  //catch obj to send
  Catch_obj:any

  constructor(private branch_ser:BranchesService,
              private modal:NgbModal,
              private catch_ser:CatchItemService,
              private  router:Router,
              private confirmationService :ConfirmationService ,
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
               if(permission.name == 'update-branches')
           {
             this.updatebranche = true
           }
           if(permission.name == 'create-branches')
           {
             this.createbranche = true ;
           }
          });
        }

        if(!this.updatebranche || !this.createbranche )
        {
          this.router.navigate(['/home'])
        }
              }


  ngOnInit(): void {
    this.getAll()
  }

  username:string='';
//get all fun
  getAll() {
    this.branch_ser.get_branchs().subscribe(res => {
      this.branchList=res.branches?.map( item =>{
        if ( item.manager?.user?.first_name == undefined ||  item.manager?.user?.second_name  == undefined || item.manager?.user?.last_name == undefined){
           this.username = ' '
         }else{
          this.username = item.manager?.user?.first_name + ' ' + item.manager?.user?.second_name + ' ' + item.manager?.user?.last_name;
         }

        item.username =this.username
       return item;
      })
    });
  }


  //add edit
  add_edit(modal, obj){
    debugger
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.Catch_obj= obj
  }

  //after update
  after(event){
    this.branchList=event ;
    this.modal.dismissAll()
  }

   ///active and de_active
    active(obj){
       this.branch_ser.active(obj).subscribe(
         res=>{
           console.log(res);
         }
       )
     }


  //send to catching
  catch_obj(obj){
    this.catch_ser.get_branch(obj)
  }




  clear(table: Table) {
    table.clear();
  }

  confirm(item:any) {
    this.confirmationService.confirm({
      message: 'هل تريد حذف الفرع ؟ ',
      accept: () => {
        this.branch_ser.delete_section(item).subscribe( (data) =>{
          this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف الفرع'});
          this.getAll();
        },err =>{
          this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف الفرع  '});
          console.log(err)
        })
      }
  });
    }
}
