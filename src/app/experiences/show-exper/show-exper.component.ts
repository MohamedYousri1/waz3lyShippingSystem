
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperianceService } from 'src/app/services/experiance.service';

@Component({
  selector: 'app-show-exper',
  templateUrl: './show-exper.component.html',
  styleUrls: ['./show-exper.component.css']
})
export class ShowExperComponent implements OnInit {
  qualificatons:any[]=[]


  //paginations
  recourdNumber:any
  row=5

  //catch object to send 
  catchobj:any
  constructor(private exper_ser:ExperianceService, private modal:NgbModal) { }

  ngOnInit(): void {
    this.getAll()
  }
  
  getAll(){
    this.exper_ser.getAll().subscribe(
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
