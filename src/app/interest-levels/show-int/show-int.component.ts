
import { Component, NgModule, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IJob } from '../../shared/Jobs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { InterestsService } from 'src/app/services/interests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-int',
  templateUrl: './show-int.component.html',
  styleUrls: ['./show-int.component.css']
})

export class ShowIntComponent implements OnInit {

  intId:any;//Send To add_edit modal

  //For Get Data And Displed In DataTable
  interst_List: IJob[];

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_name:string;
  catch_id:any
  permissions ;
  updateinterest_levels : boolean = false ;
  createinterest_levels : boolean = false ;
  constructor(private interst_ser:InterestsService,  private  router:Router ,private modal:NgbModal, private toaster:ToastrService) {
     // check permissions  For USer
     if(JSON.parse(localStorage.getItem('employee')).permissions)
     {
      this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
     }
     if(this.permissions)
     {
       this.permissions.forEach(permission => {
            if(permission.name == 'update-interest_levels')
        {
          this.updateinterest_levels = true
        }
        if(permission.name == 'create-interest_levels')
        {
          this.createinterest_levels = true ;
        }
       });
     }

     if(!this.updateinterest_levels || !this.createinterest_levels )
     {
      //  this.router.navigate(['/home'])
     }
  }

  ngOnInit(): void {
    this.getAll()
  }

  //get all
  getAll(){
    this.interst_ser.get_All().subscribe(
      res=>{
        this.interst_List=res
      }
    )
  }

  //add_edit button
  add_edit(modal, id){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.intId=id
    console.log('add');
  }


  update(updateitmes:any){
    this.interst_List=updateitmes;
    this.modal.dismissAll()
  }


  clear(table: Table) {
    table.clear();
  }
}
