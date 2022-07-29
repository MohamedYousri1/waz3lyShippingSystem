
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StateService } from 'src/app/services/state.service';
import { SubStatesService } from 'src/app/services/sub-states.service';
import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-sub-state',
  templateUrl: './edit-add-sub-state.component.html',
  styleUrls: ['./edit-add-sub-state.component.css']
})

export class EditAddSubStateComponent implements OnInit {
  myform!: FormGroup
  submited: boolean = false
  id: any
  state:string;
  //two way binding
  @Input() obj:any
  @Output() newData = new EventEmitter <any>()

  states:any[]=[]
  constructor(private fb: FormBuilder,
  private subst_ser: SubStatesService,
  private state_ser: StateService,
  private x : MessageService ,
  private toaster: ToastrService) { }

  ngOnInit(): void {
    this.build() //build form
    this.patch() //patch value

    if(this.obj){
      this.id=this.obj.id
    }else{
      this.id=""
    }

    this.get_states()
  }

  stateId:number
//new from here
  get_states(){
    this.state_ser.getAll().subscribe(
      res=>{
        this.states=res
      }
    )
  }
  build() {
    this.myform = this.fb.group({
      state: [null, Validators.required],
      state_id: [null, Validators.required]
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
  add(data:any){
    this.subst_ser.add(data).subscribe(
      res=>{
        console.log(res)
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after()

        }, 1000);
      },err=>{
            // this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
            console.log(err)
      }
    )
  }





  //edit
  edit(data, id){
    this.subst_ser.edit(data,id).subscribe(
      res=>{
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
      state:this.obj.state,
      state_id:this.obj.state_id
    })
  }

  //after update
  after(){
    this.subst_ser.getAll().subscribe(
      res=>{
        this.newData.emit(res)
      }
    )
  }
}
