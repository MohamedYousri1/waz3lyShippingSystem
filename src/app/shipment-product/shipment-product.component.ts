import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipmentsService } from '../services/shipments.service';

@Component({
  selector: 'app-shipment-product',
  templateUrl: './shipment-product.component.html',
  styleUrls: ['./shipment-product.component.css']
})
export class ShipmentProductComponent implements OnInit {
  products:any[]=[]
  catch_id:any
  ship_name:any


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
        console.log(res)
      }
    )

  }

  //get shipments for catch name
  get_name(id){
    this.ship_ser.get_one(id).subscribe(
      res=>{
        this.ship_name=res.name
      }
    )
  }

}
