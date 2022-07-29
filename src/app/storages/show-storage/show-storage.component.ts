import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoragesService } from 'src/app/services/storages.service';
import { Storage } from 'src/app/shared/models/storage';

@Component({
  providers :  [ConfirmationService,MessageService],
  selector: 'app-show-storage',
  templateUrl: './show-storage.component.html',
  styleUrls: ['./show-storage.component.css']
})
export class ShowStorageComponent implements OnInit {
  //pagination
  recourdNumber:number
  storList:Storage[]=[]
  //catch obj
  catch_obj:any
  permissions ;
  updatestorages : boolean = true;
  createstorages : boolean = true;
  updatestorage_products : boolean = true;
  createstorage_products : boolean = true;
  constructor(private stor_ser:StoragesService, private router:Router ,private modal:NgbModal , private confirmationService : ConfirmationService , private x : MessageService) {
      // check permissions  For USer
      if(JSON.parse(localStorage.getItem('employee')).permissions)
      {
       this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
      }
      if(this.permissions)
      {
        this.permissions.forEach(permission => {
        if(permission.name == 'update-storages')
         {
           this.updatestorages = true
         }
         if(permission.name == 'create-storages')
         {
           this.createstorages = true ;
         }
         if(permission.name == 'update-storages')
         {
            this.updatestorage_products = true
         }
        });
      }
      if(!this.updatestorage_products || !this.createstorages )
      {
        this.router.navigate(['/home'])
      }
   }
  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.stor_ser.get_All().subscribe(
      res=>{
        this.storList=res.store
      }
    )
  }

  add_edit(modal, obj){
    this.modal.open(modal , {size:'xm' , backdrop : 'static',keyboard : false}) ;
    this.catch_obj=obj
  }

  //update
  update(event){
    this.storList=event;
    this.modal.dismissAll()
  }


  confirm(item:any) {
    this.confirmationService.confirm({
      message: 'هل تريد حذف المخزن ؟ ',
      accept: () => {
        this.stor_ser.delete_section(item).subscribe( (data) =>{
          this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف المخزن'});
          this.getAll();
        },err =>{
          this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف المخزن  '});
          console.log(err)
        })
      }
  });
    }


}
