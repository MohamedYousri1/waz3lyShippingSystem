import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
//pagination
rows = 5;
recourdNumber:number;

clients_List

//catch object to sent it to edit_add componet
catch_obj
permissions ;
updateusers : boolean = false ;
createusers : boolean = false ;
constructor(private user_serv:UsersService,private  router:Router , private modal:NgbModal,  private toastr:ToastrService) {
   // check permissions  For USer
   if(JSON.parse(localStorage.getItem('employee')).permissions)
   {
    this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
   }
   if(this.permissions)
   {
     this.permissions.forEach(permission => {
          if(permission.name == 'update-users')
      {
        this.updateusers = true
      }
      if(permission.name == 'create-users')
      {
        this.createusers = true ;
      }
     });
   }

   if(!this.updateusers || !this.createusers){
    this.router.navigate(['/home'])
  }
 }

ngOnInit(): void {
  this.getAll()
}


//get All
getAll(){
  this.user_serv.getAll().subscribe(
    res=>{
      this.clients_List=res
    }
  )
}

//edit add function
add_edit(modal , obj){
  this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
  this.catch_obj=obj
}

//update
update(event){
  this.clients_List=event;
  this.modal.dismissAll()
}

}
