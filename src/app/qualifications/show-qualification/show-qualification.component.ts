import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QualificationsService } from 'src/app/services/qualifications.service';

@Component({
  selector: 'app-show-qualification',
  templateUrl: './show-qualification.component.html',
  styleUrls: ['./show-qualification.component.css']
})
export class ShowQualificationComponent implements OnInit {
  qualificatons:any[]=[]


  //paginations
  recourdNumber:any
  row=5

  //catch object to send 
  catchobj:any
  constructor(private qulie_ser:QualificationsService, private modal:NgbModal) { }

  ngOnInit(): void {
    this.getAll()
  }
  
  getAll(){
    this.qulie_ser.getAll().subscribe(
      res=>{
        this.qualificatons=res
      }
    )
  }

  add_edit(modal, obj){
    this.modal.open(modal)
    this.catchobj = obj
  }

  after(event){
    this.qualificatons=event
    this.modal.dismissAll()
  }
}
