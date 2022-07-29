import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Component, ErrorHandler, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IJob } from 'src/app/shared/Jobs';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/services/jobs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  providers : [MessageService] ,
  selector: 'edit-add-job',
  templateUrl: './edit-add-job.component.html',
  styleUrls: ['./edit-add-job.component.css']
})
export class EditAddJobComponent implements OnInit {
  myform!:FormGroup
  submited:boolean = false

  @Input() Catchobj; //get from show for edit
  id:any;
  @Output() sent_new= new EventEmitter <any> () //sent new data
  constructor( private fb:FormBuilder,private x : MessageService , private job_ser:JobsService, private toster:ToastrService) { }

  ngOnInit(): void {
    this.build()
    this.patch()

    if (this.Catchobj) {
      this.id=this.Catchobj.id
    }else{
      this.id=''
    }
  }

  build(){
    this.myform=this.fb.group({
      name:[null, Validators.required]
    })
  }

  get f(){ return this.myform.controls}

  onsubmit(id){
    this.submited=true
    if(this.myform.invalid){
      return;
    }
    if(id === ""){
      this.add()
    }else{
      this.edit(this.myform.value, id)
    }
  }
  add(){
    this.job_ser.add_job(this.myform.value).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after_update()
        }, 1000);
      },(err:HttpErrorResponse)=>{
      console.log(err);
        if(err){
          if(err.error.name[0]){
            this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: 'هذا الاسم موجود مسبقا'});
          }else{
            this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: 'يرجي التاكد من البيانات صحيحه'});
          }
        }
      }
    )
  }

  edit(data, id){
    this.job_ser.edit_job(data,id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after_update()
      },err=>{
        console.log(err);
        if(err){
            console.log(err);
            if(err){
              if(err.error.name[0]){
                this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'هذا الاسم موجود مسبقا'});
              }else{
                this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي التاكد من البيانات صحيحه'});
              }
            }
        }
      }
    )
  }


  //patch value to form
  patch(){
    this.myform.patchValue({
      name:this.Catchobj.name
    })
  }


  //after update
  after_update(){
    this.job_ser.get_Jobs().subscribe(
      res=>{
        this.sent_new.emit(res.jobs)
      }
    )
  }


}
