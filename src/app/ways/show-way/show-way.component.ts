import { Router } from '@angular/router';

import { Component, NgModule, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IJob } from '../../shared/Jobs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WayService } from 'src/app/services/way.service';
import { Way } from 'src/app/shared/models/way';

@Component({
  selector: 'app-show-way',
  templateUrl: './show-way.component.html',
  styleUrls: ['./show-way.component.css']
})
export class ShowWayComponent implements OnInit {

  intId:any;//Send To add_edit modal

  //For Get Data And Displed In DataTable
  ways_List: Way[];

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_name:string;
  catch_id:any
  permissions ;
  updateways : boolean = false ;
  createways : boolean = true ;
  constructor(private ways_ser:WayService, private  router:Router , private modal:NgbModal, private toaster:ToastrService) {
      // check permissions  For USer
      if(JSON.parse(localStorage.getItem('employee')).permissions)
      {
       this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
      }
      if(this.permissions)
      {
        this.permissions.forEach(permission => {
             if(permission.name == 'update-ways')
         {
           this.updateways = true
         }
         if(permission.name == 'create-ways')
         {
           this.createways = true ;
         }
        });
      }

      if(!this.updateways && !this.createways){
        this.router.navigate(['/home'])
      }
  }

  ngOnInit(): void {
    this.getAll()
  }

  //get all
  getAll(){
    this.ways_ser.get_All().subscribe(
      res=>{
        this.ways_List=res
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
    this.ways_List=updateitmes;
    this.modal.dismissAll()
  }


  clear(table: Table) {
    table.clear();
  }
}
