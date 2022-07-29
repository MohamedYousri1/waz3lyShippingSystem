import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from 'src/app/services/state.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-state',
  templateUrl: './show-state.component.html',
  styleUrls: ['./show-state.component.css']
})
export class ShowStateComponent implements OnInit {

  producsList:any=[]

  //pagination
  rows = 5;
  recourdNumber:number;


  //catch object to sent it
  catch_obj:any
  permissions ;
  updatestates : boolean = false ;
  createstates : boolean = false ;
  constructor(private state_ser:StateService, private  router:Router , private modal:NgbModal,private confirmationService: ConfirmationService, private x : MessageService
    ) {
     // check permissions  For USer
   if(JSON.parse(localStorage.getItem('employee')).permissions)
   {
    this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
   }
   if(this.permissions)
   {
     this.permissions.forEach(permission => {
          if(permission.name == 'update-states')
      {
        this.updatestates = true
      }
      if(permission.name == 'create-states')
      {
        this.createstates = true ;
      }
     });
   }

   if(!this.updatestates || !this.createstates )
   {
     this.router.navigate(['/home'])
   }
   }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.state_ser.getAll().subscribe(
      res=>{
        this.producsList=res
      }
    )
  }

  add_edit(modal, obj){
    this.modal.open(modal, {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  after(event){
    this.producsList=event
    this.modal.dismissAll()
  }

  confirm(item:any) {
    this.confirmationService.confirm({
      message: 'هل تريد حذف حالة ؟',
      accept: () => {
        this.state_ser.delete_section(item).subscribe( (data) =>{
          this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف حالة'});
          this.getAll();
        },err =>{
          this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف حالة '});

          console.log(err)
        })
      }
  });

    }

}

