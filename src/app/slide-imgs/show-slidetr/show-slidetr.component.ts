import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderService } from './../../services/slider.service';
import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-show-slidetr',
  templateUrl: './show-slidetr.component.html',
  styleUrls: ['./show-slidetr.component.css']
})
export class ShowSlidetrComponent implements OnInit {

  //For Get Data And Displed In DataTable
  sliderLists;

  //pagination
  rows = 5;
  recourdNumber:number;

  //catch objc to send it to modal
  catch_obj ;
  permissions ;
  updateAdvertisments : boolean = true ;
  createAdvertisments : boolean = true ;
  constructor(private slider_serv:SliderService,private x : MessageService  , private modal:NgbModal ) {
    //this.recourdNumber = this.sliderLists.length;

        // check permissions  For USer
        if(JSON.parse(localStorage.getItem('employee')).permissions)
        {
        this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
        }
        if(this.permissions)
        {
          this.permissions.forEach(permission => {
              if(permission.name == 'update-advertisements')
          {
            this.updateAdvertisments = true
          }
          if(permission.name == 'create-advertisements')
          {
            this.createAdvertisments = true ;
          }
          });
        }
  }


  ngOnInit(): void {
    this.getAll();
  }



  getAll(){
    this.slider_serv.getAll().subscribe(res =>{
      this.sliderLists=res.advertisement
    })
  }
  add_edit(modal, obj){

    this.modal.open(modal , {size : 'lg' ,  backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }
  //after updated
  update(newItems){
    this.sliderLists=newItems
    this.modal.dismissAll()
  }
  // clear(table: Table) {
  //   table.clear();
  // }
   // Delte Row
   deleteItem(item)
   {
     let confirmation  = confirm("هل تريد حذف الصوره ؟ ") ;
     if(confirmation )
     {
      this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم حذف الصوره'});
       this.slider_serv.delete(item).subscribe((data) =>  {
       this.getAll() ;
       });

     }else{
      this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'تم الغاء الحذف'});
     }
   }
}
