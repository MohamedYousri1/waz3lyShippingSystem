
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StateService } from 'src/app/services/state.service';

import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-state',
  templateUrl: './edit-add-state.component.html',
  styleUrls: ['./edit-add-state.component.css']
})

export class EditAddStateComponent implements OnInit {
  myform!: FormGroup
  submited: boolean = false
  id: any

  //two way binding
  @Input() obj:any
  @Output() newData = new EventEmitter <any>()
  constructor(private fb: FormBuilder, private state_ser: StateService,private x : MessageService , private toaster: ToastrService) { }

  ngOnInit(): void {
    this.build() //build form
   this.patch() //patch value

    if(this.obj){
      this.id=this.obj.id
    }else{
      this.id=""
    }

  }


  build() {
    this.myform = this.fb.group({
      state: [null, Validators.required]
    })
  }

  get f() { return this.myform.controls }


  onsubmit(id){
    this.submited=true
    if(this.myform.invalid){
      return;
    }
    if(id === ""){
      this.add(this.myform.value)
    }else{
      this.edit(this.myform.value, id)
    }
  }

  //add
  add(data){
    this.state_ser.add(data).subscribe(
      res=> {
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after()

        }, 1000);
      },err=>{
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }

  //edit
  edit(data, id){
    this.state_ser.edit(data,id).subscribe(
      res=> {
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after()
      },err=>{
        console.log(err);
          this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }

  //patch
  patch(){
    this.myform.patchValue({
      state:this.obj.state
    })
  }

  //after update
  after(){
    this.state_ser.getAll().subscribe(
      res=>{
        this.newData.emit(res)
      }
    )
  }
}
