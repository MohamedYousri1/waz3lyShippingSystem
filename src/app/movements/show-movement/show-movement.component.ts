
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/services/employee.service';
import { MovementsService } from 'src/app/services/movements.service';
import { Movment } from 'src/app/shared/models/movment';

@Component({
  selector: 'app-show-movement',
  templateUrl: './show-movement.component.html',
  styleUrls: ['./show-movement.component.css']
})

export class ShowMovementComponent implements OnInit {
  moveList:Movment[]=[]

  //pagination
  rows = 5;
  recourdNumber:number;

  //catch object to sent it to eitd add
  catch_obj:any

  employees:any[]=[];
  constructor(private pay_ser:MovementsService, private employe_ser:EmployeeService, private modal:NgbModal) { }

  ngOnInit(): void {
    this.getAll()
    this.get_employees()
  }

  get_employees(){
    this.employe_ser.employ().subscribe(
      res=>{
        this.employees=res
      }
    )
  }



  //get all
  getAll(){
    this.pay_ser.getAll().subscribe(
      res=>{
        this.moveList=res
      }
    )
  }

  //edit add
  add_edit(modal, obj){
    this.modal.open(modal ,  {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }

  //after update
  after(event){
    this.moveList=event
    this.modal.dismissAll()
  }

}

