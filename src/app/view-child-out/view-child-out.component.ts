import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsService } from './../services/outs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-child-out',
  templateUrl: './view-child-out.component.html',
  styleUrls: ['./view-child-out.component.css']
})
export class ViewChildOutComponent implements OnInit {
  child_categories:any[]=[]
  catch_name:any
  catch_id=0

  //paginations
  recourdNumber:any
  row=5

  //catch object to send
  catchobj:any
  permissions ;
  updateins : boolean = false ;
  createins : boolean = false ;
  constructor(private  Activ_rout:ActivatedRoute, private  router:Router , private out_serv:OutsService, private modal:NgbModal, private toaster:ToastrService) {
    this.Activ_rout.params.subscribe(
      res=>{
        this.catch_id=res.id //send real id to get its value
      }
    )


          // check permissions  For USer
          if(JSON.parse(localStorage.getItem('employee')).permissions)
          {
           this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
          }
          if(this.permissions)
          {
            this.permissions.forEach(permission => {
                 if(permission.name == 'update-outs')
             {
               this.updateins = true
             }
             if(permission.name == 'create-outs')
             {
               this.createins = true ;
             }
            });
          }

          if(!this.updateins || !this.createins){
            this.router.navigate(['/home'])
          }
  }

  ngOnInit(): void {
    this.getAll(this.catch_id)
    //this.get_for_name(this.catch_id)
  }

  getAll(id){
    this.out_serv.get_one(id).subscribe(
      res=>{
        //this.child_categories=Array.of(res);
        this.catch_name=res.name
        this.child_categories=res.ins
        console.log(this.child_categories);
      }
    )
  }

  add_edit(modal, obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catchobj = obj
  }


  after(event){
    this.child_categories=event.ins
    this.modal.dismissAll()
    console.log(event);
  }



/*get one for name
get_for_name(id){
  this.out_serv.get_one(id).subscribe(
    res=>{
      this.catch_name=res.name
    }
  )
}*/

}
