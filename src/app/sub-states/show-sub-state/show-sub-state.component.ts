import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubStatesService } from 'src/app/services/sub-states.service';

@Component({
  selector: 'app-show-sub-state',
  templateUrl: './show-sub-state.component.html',
  styleUrls: ['./show-sub-state.component.css']
})
export class ShowSubStateComponent implements OnInit {

  producsList:any=[]

  //pagination
  rows = 5;
  recourdNumber:number;


  //catch object to sent it
  catch_obj:any
  permissions ;
  updatesub_states : boolean = false ;
  createsub_states : boolean = false ;
  constructor(private subst_ser:SubStatesService,private  router:Router , private modal:NgbModal) {
     // check permissions  For USer
     if(JSON.parse(localStorage.getItem('employee')).permissions)
     {
      this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
     }
     if(this.permissions)
     {
       this.permissions.forEach(permission => {
            if(permission.name == 'update-sub_states')
        {
          this.updatesub_states = true
        }
        if(permission.name == 'create-sub_states')
        {
          this.createsub_states = true ;
        }
       });
     }


     if(!this.updatesub_states || !this.createsub_states){
       this.router.navigate(['/home'])
     }
   }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.subst_ser.getAll().subscribe(
      res=>{
        this.producsList=res
      }
    )
  }

  add_edit(modal, obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  after(event){
    this.producsList=event
    this.modal.dismissAll()
  }

}

