import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductStatusesService } from 'src/app/services/product-statuses.service';

@Component({
  selector: 'app-show-product-stat',
  templateUrl: './show-product-stat.component.html',
  styleUrls: ['./show-product-stat.component.css']
})
export class ShowProductStatComponent implements OnInit {

  producsList:any=[]

  //pagination
  rows = 5;
  recourdNumber:number;


  //catch object to sent it
  catch_obj:any
  permissions ;
  updateproduct_statuses : boolean = false ;
  createproduct_statuses : boolean = false ;
  constructor(private prodcut_ser:ProductStatusesService,  private  router:Router , private modal:NgbModal) {
       // check permissions  For USer
       if(JSON.parse(localStorage.getItem('employee')).permissions)
       {
        this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
       }
       if(this.permissions)
       {
         this.permissions.forEach(permission => {
              if(permission.name == 'update-product_statuses')
          {
            this.updateproduct_statuses = true
          }
          if(permission.name == 'create-product_statuses')
          {
            this.createproduct_statuses = true ;
          }
         });
       }


      if(!this.updateproduct_statuses || !this.createproduct_statuses )
      {
        this.router.navigate(['/home'])
      }
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.prodcut_ser.getAll().subscribe(
      res=>{
        this.producsList=res
      }
    )
  }

  add_edit(modal, obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  after(event){
    this.producsList=event
    this.modal.dismissAll()
  }

}
