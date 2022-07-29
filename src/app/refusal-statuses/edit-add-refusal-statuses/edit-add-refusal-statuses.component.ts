import { RefusalStatusesService } from './../../services/refusal-statuses.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-refusal-statuses',
  templateUrl: './edit-add-refusal-statuses.component.html',
  styleUrls: ['./edit-add-refusal-statuses.component.css']
})
export class EditAddRefusalStatusesComponent implements OnInit {
  myform!: FormGroup
  submited: boolean = false
  id: any


  //two way binding
  @Input() obj:any
  @Output() newData = new EventEmitter <any>()
  constructor(private fb: FormBuilder, private res_ser:RefusalStatusesService,private x : MessageService  ) { }

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
      status: [null, Validators.required]
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
    this.res_ser.add(data).subscribe(
        res=>{
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
          setTimeout(() => {
            this.after()
          }, 1000);
         },err=>{
          console.log(err);
          if(err){
            if(err.name[0]){
              this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'هذا السبب موجود مسبقا'});
            }else
            {
              this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'تاكد ان جميع البيانات صحيحه '});
            }
          }
        }
    )
  }

  //edit
  edit(data, id){
    this.res_ser.edit(data, id).subscribe(
      res=>{
        console.log(res);
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
     this.after()
      },err=>{
       console.log(err);
       if(err){
         if(err.name[0]){
           this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'هذا الاسم موجود مسبقا'});
         }else
         {
           this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'تاكد ان جميع البيانات صحيحه '});
         }
       }
     }
    )
  }

  //patch
  patch(){
    debugger
    this.myform.patchValue({

      status:this.obj.status
    })
  }

  //after update
  after(){
    this.res_ser.get_All().subscribe(
      res=>{
        this.newData.emit(res)
      }
    )
  }
}
