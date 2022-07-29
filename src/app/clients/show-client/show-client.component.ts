import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from 'src/app/shared/models/client';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.css']
})
export class ShowClientComponent implements OnInit {
  //pagination
  rows = 5;
  recourdNumber:number;

  clients_List:Client[]=[]

  //catch object to sent it to edit_add componet
  catch_obj:Client
  formData : FormGroup ;
  permissions ;
  updateclients : boolean = false ;
  createclients : boolean = false ;
  constructor(private client_Ser:ClientsService, private  router:Router ,private modal:NgbModal,  private toastr:ToastrService , private fb:FormBuilder , private x : MessageService ,
    ) {
     // check permissions  For USer
     if(JSON.parse(localStorage.getItem('employee')).permissions)
     {
      this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
     }
     if(this.permissions)
     {
       this.permissions.forEach(permission => {
            if(permission.name == 'update-clients')
        {
          this.updateclients = true
        }
        if(permission.name == 'create-clients')
        {
          this.createclients = true ;
        }

       });
     }

     if(!this.updateclients || !this.createclients )
     {
       this.router.navigate(['/home'])
     }
   }

  ngOnInit(): void {
    this.getAll()
    this.build()
  }

  username:any
  //get All
  getAll(){
    this.client_Ser.getAll().subscribe(
      res=>{
        this.clients_List=res.map( item=>{
          this.username = item?.first_name + ' ' + item?.last_name;
          item.username = this.username
          return item;
        })
      }
    )
  }

  client_id ;
  //edit add function
  add_edit(modal , obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
    this.client_id = obj.id ;
    obj.username =     this.username
    // this.getAll();
  }

  build()
  {
    this.formData = this.fb.group({
      password   : [null , Validators.required] ,
      password_confirmation :[null , Validators.required] ,
      email : [null , [Validators.required , Validators.email] ]
    })
  }
  //update
  update(event){
    this.clients_List=event;
    this.getAll();
    this.modal.dismissAll()
  }
  turnClient()
  {
   if(this.client_id)
   {
     if(this.formData.value.password === this.formData.value.password_confirmation ){
      return this.client_Ser.turnClient(this.client_id , this.formData.value).subscribe(res => {
        console.log(res);
        this.getAll() ;
        this.modal.dismissAll()
      }) ;
     }else{
      this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' تأكيد كلمة السر غير متطابق '});

     }

   }
  }


}
