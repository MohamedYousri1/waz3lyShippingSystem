import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Trans } from 'src/app/shared/models/trans';

@Component({
  selector: 'app-show-transaction',
  templateUrl: './show-transaction.component.html',
  styleUrls: ['./show-transaction.component.css']
})
export class ShowTransactionComponent implements OnInit {

  //For Get Data And Displed In DataTable
  List:Trans[]=[];

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:any
  permissions ;
  updatetransactions : boolean = false ;
  createtransactions : boolean = false ;
  constructor(private transactions_ser:TransactionsService, private  router:Router ,private modal:NgbModal, private toaster:ToastrService) {
    // check permissions  For USer
    if(JSON.parse(localStorage.getItem('employee')).permissions)
    {
     this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
    }
    if(this.permissions)
    {
      this.permissions.forEach(permission => {
           if(permission.name == 'update-transactions')
       {
         this.updatetransactions = true
       }
       if(permission.name == 'create-transactions')
       {
         this.createtransactions = true ;
       }
      });
    }

    if(!this.updatetransactions || !this.createtransactions){
      this.router.navigate(['/home'])
    }
  }
  ngOnInit(): void {
    this.getAll()
  }

  //get all
  getAll(){
    this.transactions_ser.getAll().subscribe(
      res=>{
        this.List=res
        console.log(this.List)
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
}



