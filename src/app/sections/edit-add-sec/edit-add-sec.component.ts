import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SectionsService } from 'src/app/services/sections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-sec',
  templateUrl: './edit-add-sec.component.html',
  styleUrls: ['./edit-add-sec.component.css']
})
export class EditAddSecComponent implements OnInit {
  myform!:FormGroup
  submited:boolean=false
  id:any
  debugger
  //two way form child and parent
  @Input() Catchobj
  @Output() updated = new EventEmitter <any>()
  //get objcet here from parent
  constructor(private fb:FormBuilder,  private x : MessageService ,private sec_ser:SectionsService, private toaster:ToastrService){}
  ngOnInit(){
    this.build()
    this.get_allDepartments() ;
    //patch
    this.patch()
    if(this.Catchobj){
      this.id=this.Catchobj.id
    }else{
      this.id=""
    }
  }
  build(){
    this.myform=this.fb.group({
      name:[null, Validators.required]
    })
  }
  get f() {return this.myform.controls}
  onsubmit(id){
    this.submited=true
    if(this.myform.invalid){
      return;
    }
    if(id === ""){
      this.add(this.myform.value)
    }else{
      this.edit(this.myform.value, this.id)
    }
  }
  //add funciton
  add(data){
    debugger
    let  nameExist = [] ;
    nameExist  = this.allDepartments.filter((ele =>  {return ele.name.trim()  == this.myform.controls.name.value.trim()})) ;
   if(nameExist.length > 0 )
   {
     this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'هذا الإسم تم إدخاله من قيل'});
   }else
   {
    this.sec_ser.add_sections(data).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after_update()
        }, 1000);

      },err=>{
        console.log(err);
        if(err){
          if(err.error.name[0]){
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'هذا الاسم موجود مسبقا'});
          }else{
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي التاكد من البيانات صحيحه'});
          }
        }
      }
    )
   }
      }
  //edit function
  edit(data, id){
 let  nameExist = [] ;
     nameExist  = this.allDepartments.filter((ele =>  {return ele.name.trim()  == this.myform.controls.name.value.trim()})) ;
    if(nameExist.length > 0 )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'هذا الإسم تم إدخاله من قيل'});
    }else
    {
      this.sec_ser.edit_section(data, id).subscribe(
        res=>{
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
          this.after_update()
        },err=>{
          console.log(err);
            // if(err.error?.name[0]){
            //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'هذا الاسم موجود مسبقا'});
            // }else{
            //   this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي التاكد من البيانات صحيحه'});
            // }

        }
      )
    }
  }

  //two way binding
  patch(){
     this.myform.patchValue({
       name:this.Catchobj.name
     })
  }

  //new value
  allDepartments : any[]  =  [];
get_allDepartments()
{
  this.sec_ser.get_sections().subscribe(
    res=>{
      this.allDepartments = res.departments;
    }
  )
}
  after_update(){
    this.sec_ser.get_sections().subscribe(
      res=>{
        this.updated.emit(res.departments)
        this.allDepartments = res.departments;
      }
    )
  }
}
