import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { RefusalStatusesService } from './../../services/refusal-statuses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-refusal-statuses',
  templateUrl: './show-refusal-statuses.component.html',
  styleUrls: ['./show-refusal-statuses.component.css']
})
export class ShowRefusalStatusesComponent implements OnInit {

  producsList   ;

  //pagination
  rows = 5;
  recourdNumber:number;


  //catch object to sent it
  catch_obj:any
  permissions ;
  updatereceive_statuses : boolean = false ;
  createreceive_statuses : boolean = false ;
  constructor(private res_ser:RefusalStatusesService,private  router:Router , private modal:NgbModal) {
     // check permissions  For USer
     if(JSON.parse(localStorage.getItem('employee')).permissions)
     {
      this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
     }
     if(this.permissions)
     {
       this.permissions.forEach(permission => {
            if(permission.name == 'update-receive_statuses')
        {
          this.updatereceive_statuses = true
        }
        if(permission.name == 'create-receive_statuses')
        {
          this.createreceive_statuses = true ;
        }
       });
     }
     if(!this.updatereceive_statuses || !this.createreceive_statuses )
     {
       this.router.navigate(['/home'])
     }
   }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.res_ser.get_All().subscribe(
      res=>{
        this.producsList=res
      }
    )
  }

  add_edit(modal, obj){
    debugger
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  after(event){
    this.producsList=event
    this.modal.dismissAll()
  }

}
