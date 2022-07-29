import { ReportsService } from './../services/reports.service';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backshipments',
  templateUrl: './backshipments.component.html',
  styleUrls: ['./backshipments.component.css']
})
export class BackshipmentsComponent implements OnInit {

  //For Get Data And Displed In DataTable
  List:any[]=[];

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:any
  myForm : FormGroup ;
  constructor( private _formBuilder: FormBuilder , private _repres : ReportsService ,private shipBack : ShipmentsService ,  private modal:NgbModal, private toaster:ToastrService) {}
  ngOnInit(): void {
    this.build() ;
    this.getshipBack()
    this.getRepresentatives()

  }


  build()
  {
    this.myForm = this._formBuilder.group({
      employee_id : [null , Validators.required]
    });
  }

  sendData()
  {
    
    return this.shipBack.addRepresentativeOnBack(this.myForm.value , this.ship_id).subscribe(res => {
      console.log(res);
      this.modal.dismissAll()
      this.getshipBack() ;

    })
  }
  //get all
  ship_id ;
  getshipBack(){
    this.shipBack.get_backshipment().subscribe(
      res=>{
        this.List=res ;


      }
    )
  }



  //add_edit button
  add_edit(modal,obj){
    debugger
    this.modal.open(modal, {size:'lg' , backdrop : 'static',keyboard : false}) //, backdrop: 'static'
    this.catch_obj=obj ;
    this.ship_id = obj.id ;

  }


  update(updateitmes:any){
    this.List=updateitmes;
    this.modal.dismissAll()
  }




  allRepresentatives;
  getRepresentatives()
  {
    debugger
    return this._repres.get_allRepresentative().subscribe(res => {
      console.log(res);
      this.allRepresentatives  = res ;
      console.log(res);


    })
  }


  clear(table: Table) {
    table.clear();
  }


}
