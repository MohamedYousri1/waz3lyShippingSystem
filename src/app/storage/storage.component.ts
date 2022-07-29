import { StoragesService } from './../services/storages.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  catch_id:any
  products:any[]=[]

  //catch name from ser
  storage_name:any



  //pagination
  rows = 5;
  recourdNumber:number;
  constructor(private storage_ser:StoragesService,
              private rout:ActivatedRoute) { }

  ngOnInit(): void {
    this.rout.params.subscribe(
      res=>{
        this.catch_id=res.id
      }
    )
    this.get_product(this.catch_id)
    // this.getone_storage(this.catch_id)
  }


 //get one shipment
 get_product(id){
   debugger
  this.storage_ser.get_products(id).subscribe(
    res=>{
      this.products=res
      console.log(res);
    }
  )
}




}
