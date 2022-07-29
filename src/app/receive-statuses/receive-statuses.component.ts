  
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-receive-statuses',
  templateUrl: './receive-statuses.component.html',
  styleUrls: ['./receive-statuses.component.css']
})
export class ReceiveStatusesComponent implements OnInit {
  
  producsList:any=[]

  //pagination
  rows = 5;
  recourdNumber:number;


  //catch object to sent it 
  catch_obj:any

  constructor(private state_ser:StateService, private modal:NgbModal) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.state_ser.getAll().subscribe(
      res=>{
        this.producsList=res
      }
    )
  }

  add_edit(modal, obj){
    this.modal.open(modal)
    this.catch_obj=obj
  }


  after(event){
    this.producsList=event
    this.modal.dismissAll()
  }

}


