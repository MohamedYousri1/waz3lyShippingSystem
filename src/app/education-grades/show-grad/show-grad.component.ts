
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EducationGradesService } from 'src/app/services/education-grades.service';

@Component({
  selector: 'app-show-grad',
  templateUrl: './show-grad.component.html',
  styleUrls: ['./show-grad.component.css']
})
export class ShowGradComponent implements OnInit {
  qualificatons:any[]=[]


  //paginations
  recourdNumber:any
  row=5

  //catch object to send 
  catchobj:any
  constructor(private edu_ser:EducationGradesService, private modal:NgbModal) { }

  ngOnInit(): void {
    this.getAll()
  }
  
  getAll(){
    this.edu_ser.getAll().subscribe(
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

