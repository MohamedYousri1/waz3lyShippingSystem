import { ReportsService } from './../services/reports.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PendingShipmentsService } from './../services/pending-shipments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-shipments',
  templateUrl: './pending-shipments.component.html',
  styleUrls: ['./pending-shipments.component.css']
})
export class PendingShipmentsComponent implements OnInit {

  //For Get Data And Displed In DataTable
  List:any[]=[];

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:any
  myForm : FormGroup ;
  constructor( private _formBuilder: FormBuilder ,private ship_ser:ReportsService,private _pending:PendingShipmentsService, private modal:NgbModal, private toaster:ToastrService) {}
  ngOnInit(): void {
    this.build() ;
    this.getPending()
    this.getBranches ()
    this.getRepresentatives()

  }


  build()
  {
    this.myForm = this._formBuilder.group({
      branch_id: [null, Validators.required] ,
      storage_id: [null, Validators.required] ,
      employee_id : [null , Validators.required] ,
      price  : [null]
    });
  }

  sendData()
  {
    
    return this._pending.addData(this.myForm.value , this.shipment_id).subscribe(res => {
      console.log(res);
      this.modal.dismissAll()

    })
  }
  //get all
  getPending(){
    this._pending.getPending().subscribe(
      res=>{
        this.List=res
        this.getPending();

      }
    )
  }

  // get branches
  allBranches ;
  getBranches ()
  {
    return this._pending.getBranches().subscribe(res => {
      this.allBranches  = res ;
    })
  }


  branch_id ;
  shipment_id ;
  //add_edit button
  add_edit(modal,obj){
    debugger
    this.branch_id = obj.branch_id ;
    this.shipment_id = obj.id;
    this.modal.open(modal, {size:'lg' , backdrop : 'static',keyboard : false}) //, backdrop: 'static'
    this.catch_obj=obj ;

  }


  update(updateitmes:any){
    this.List=updateitmes;
    this.modal.dismissAll()
  }

  storages
  onBranchChange(branch_id)
  {
    debugger
    return this._pending.getstorage(branch_id).subscribe(res =>  {
      this.storages  = res ;
      console.log(res);
    })
  }



  allRepresentatives;
  getRepresentatives()
  {
    debugger
    return this.ship_ser.get_allRepresentative().subscribe(res => {
      console.log(res);
      this.allRepresentatives  = res ;
      console.log(res);


    })
  }


  clear(table: Table) {
    table.clear();
  }

}
