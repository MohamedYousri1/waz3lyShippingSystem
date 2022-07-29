import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { StorageSystemService } from 'src/app/storage-system.service';
@Component({
  providers : [MessageService , ConfirmationService] ,
  selector: 'app-show-storege-system',
  templateUrl: './show-storege-system.component.html',
  styleUrls: ['./show-storege-system.component.css']
})
export class ShowStoregeSystemComponent implements OnInit {


  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  //For Pathing Data To Add Edit Component


  //For Get Data And Displed In DataTable
  storageList: any;

  //pagination
  rows = 5;
  recourdNumber:number;

  //catch id to send it to modal
  catch_obj:any
  permissions ;
  updatejob : boolean = true ;
  createjob : boolean = true ;
  constructor(private _offer:StorageSystemService, private confirmationService: ConfirmationService, private  router:Router ,private modal:NgbModal,private x : MessageService , private toaster:ToastrService) {
        // check permissions  For USer
        if(JSON.parse(localStorage.getItem('employee')).permissions)
        {
         this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
        }
        if(this.permissions)
        {
          this.permissions.forEach(permission => {
               if(permission.name == 'update-jobs')
           {
             this.updatejob = true
           }
           if(permission.name == 'create-jobs')
           {
             this.createjob = true ;
           }
          });
        }
        // if(!this.updatejob || !this.createjob )
        // {
        //   this.router.navigate(['/home'])
        // }
  }


  ngOnInit(): void {
    this.getStorageSystems();
  }



  getStorageSystems(){
    this._offer.get_storage_system().subscribe((res   : any ) =>{
      debugger
      console.log(res);
      this.storageList=res.storage_system
    })
  }

  edit_add(modal , obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }

  after(event){
    this.storageList=event
    this.modal.dismissAll()
  }

  clear(table: Table) {
    table.clear();
  }
confirm(item:any) {
  this.confirmationService.confirm({
    message: 'هل تريد حذف العرض',
    accept: () => {
      this._offer.delete_section(item).subscribe( (data) =>{
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف العرض'});
        this.getStorageSystems();
      },err =>{
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف العرض  '});
        console.log(err)
      })
    }
});
  }




  moreDetails : any;
dataIsReady : boolean =  false ;
moreDetailsFun(modal : any  , obj )
{
  debugger
  this.moreDetails = null ;
  this.moreDetails = obj.company ;
  this.modal.open(modal , {size : 'lg' }) ;
  if(this.moreDetails != null && this.moreDetails != undefined)
  {
    this.dataIsReady = true ;
  }else
  {
    this.dataIsReady = false  ;
  }
}

}
