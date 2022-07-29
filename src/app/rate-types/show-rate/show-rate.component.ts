import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RateTypesService } from './../../services/rate-types.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-rate',
  templateUrl: './show-rate.component.html',
  styleUrls: ['./show-rate.component.css']
})
export class ShowRateComponent implements OnInit {
  rateLists ;

  //pagination
  rows = 5;
  recourdNumber:number;


  //catch object to sent it
  catch_obj:any
  permissions ;
  updaterate_type : boolean = false ;
  createrate_type : boolean = false ;
  constructor(private rate_serv:RateTypesService,private  router:Router , private modal:NgbModal ,  private confirmationService: ConfirmationService, private x : MessageService) {
             // check permissions  For USer
             if(JSON.parse(localStorage.getItem('employee')).permissions)
             {
              this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
             }
             if(this.permissions)
             {
               this.permissions.forEach(permission => {
                    if(permission.name == 'update-rate_types')
                {
                  this.updaterate_type = true
                }
                if(permission.name == 'create-rate_types')
                {
                  this.createrate_type = true ;
                }
               });
             }

             if(!this.updaterate_type || !this.createrate_type )
             {
               this.router.navigate(['/home'])
             }
   }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    debugger
    this.rate_serv.get_All().subscribe(
      res=>{
        debugger
        this.rateLists=res
      }
    )
  }

  add_edit(modal, obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  after(event){
    this.rateLists=event
    this.modal.dismissAll()
  }


confirm(item:any) {


  this.confirmationService.confirm({
    message: 'هل تريد حذف تقييم ؟',
    accept: () => {
      this.rate_serv.delete_section(item).subscribe( (data) =>{
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف تقييم'});
        this.getAll();
      },err =>{
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف تقييم  '});

        console.log(err)
      })
    }
});

  }

}
