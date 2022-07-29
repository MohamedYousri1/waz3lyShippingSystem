import { ShipmentsService } from './../services/shipments.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipments-new',
  templateUrl: './shipments-new.component.html',
  styleUrls: ['./shipments-new.component.css']
})
export class ShipmentsNewComponent implements OnInit {
  products:any[]=[]
  catch_id:any
  allData:any


  //paginations
  recourdNumber:any
  row=5
  constructor(private Activate:ActivatedRoute,
              private ship_ser:ShipmentsService) { }

  ngOnInit(): void {
    this.Activate.params.subscribe(
      res=>{
        this.catch_id=res.id
      }
    )
    this.get_shipment(this.catch_id)
    this.get_name(this.catch_id)
  }

  get_shipment(id){
    this.ship_ser.get_shipment(id).subscribe(
      res=>{
        this.products=res
      }
    )
  }

  //get shipments for catch name
  get_name(id){
    this.ship_ser.get_one(id).subscribe(
      res=>{
        this.allData=res.products ;
        console.log(this.allData);

      }
    )
  }


}
