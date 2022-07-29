import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipmentsService } from '../services/shipments.service';
import { StoragesService } from '../services/storages.service';
import { RepresentativesDetailsService } from '../services/representatives-details.service';

@Component({
  selector: 'app-storage-shipments',
  templateUrl: './storage-shipments.component.html',
  styleUrls: ['./storage-shipments.component.css']
})
export class StorageShipmentsComponent implements OnInit {
  catch_id:any
  shipments:any[]=[]

  //catch name from ser
  storage_name:any



  //pagination
  rows = 5;
  recourdNumber:number;
  constructor(private storage_ser:StoragesService,
    private _formBuilder: FormBuilder ,
                      private ship_ser:ShipmentsService,
                      private modal:NgbModal,
                      private toaster:ToastrService,
                      private _representaive : RepresentativesDetailsService ,
              private rout:ActivatedRoute) { }

  ngOnInit(): void {
    this.build()

    this.rout.params.subscribe(
      res=>{
        this.catch_id=res.id
      }
    )
    this.get_shipment(this.catch_id)
    this.getone_storage(this.catch_id)
  }



  myForm : FormGroup ;
  build()
  {
    this.myForm = this._formBuilder.group({
      employee_id: [null, Validators.required] ,
      delivery_date : [null  , Validators.required]
    });
  }
  allRepresentatives;
  getRepresentatives()
  {
    debugger
    return this._representaive.get_allRepresentative().subscribe(res => {
      console.log(res);
      this.allRepresentatives  = res ;
      console.log(res);
    })
  }

  addRepresentative()
  {
    return this.ship_ser.addRepresentative(this.myForm.value , this.ship_id).subscribe(res =>  {
      console.log(res);
      this.modal.dismissAll()
      this.get_shipment(this.storage_id)
    })
  }

  ship_id
  storage_id
  add_edit(modal,obj){
    debugger
    this.ship_id = obj.id
    this.storage_id = obj.storage_id
    this.modal.open(modal,{size:'lg' , backdrop : 'static',keyboard : false}) //, backdrop: 'static'
    this.getRepresentatives()
  }


 //get one shipment
 get_shipment(id){
  this.storage_ser.get_shipments(id).subscribe(
    res=>{
      this.shipments=res
      console.log(res);
    }
  )
}

  //get one storag to show it name
  getone_storage(id){
    this.storage_ser.get_one_storage(id).subscribe(
      res=>{
        this.storage_name=res.name
      }
    )
  }


}
