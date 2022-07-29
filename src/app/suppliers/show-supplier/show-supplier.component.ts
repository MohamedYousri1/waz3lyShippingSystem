import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-show-supplier',
  templateUrl: './show-supplier.component.html',
  styleUrls: ['./show-supplier.component.css']
})

export class ShowSupplierComponent implements OnInit {
  qualificatons:any[]=[]


  //paginations
  recourdNumber:any
  row=5

  //catch object to send
  catchobj:any
  permissions ;
  updatesuppliers : boolean = false ;
  createsuppliers : boolean = false ;
  constructor(private qulie_ser:SuppliersService,private  router:Router , private modal:NgbModal) {
     // check permissions  For USer
     if(JSON.parse(localStorage.getItem('employee')).permissions)
     {
      this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
     }
     if(this.permissions)
     {
       this.permissions.forEach(permission => {
            if(permission.name == 'update-suppliers')
        {
          this.updatesuppliers = true
        }
        if(permission.name == 'create-suppliers')
        {
          this.createsuppliers = true ;
        }
       });
     }

     if(!this.updatesuppliers || !this.createsuppliers){
      this.router.navigate(['/home'])
    }
   }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.qulie_ser.getAll().subscribe(
      res=>{
        this.qualificatons=res
      }
    )
  }

  add_edit(modal, obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catchobj = obj
  }

  after(event){
    this.qualificatons=event
    this.modal.dismissAll()
  }
}

