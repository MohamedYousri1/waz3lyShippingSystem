import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QualificationsService } from 'src/app/services/qualifications.service';

@Component({
  selector: 'app-edit-add-qualification',
  templateUrl: './edit-add-qualification.component.html',
  styleUrls: ['./edit-add-qualification.component.css']
})
export class EditAddQualificationComponent implements OnInit {
  myform!:FormGroup
  submited:boolean = false
  id:any


  //two way binding
  @Input() Catchobj;
  @Output() newData = new EventEmitter <any> ()
  constructor(private fb:FormBuilder, private quali_ser:QualificationsService, private toaster:ToastrService) { }

  ngOnInit(): void {
    this.build()
    this.patch()
    if(this.Catchobj){
      this.id=this.Catchobj.id
    }else{
      this.id=''
    }
  }

  build(){
    this.myform=this.fb.group({
      qualification:[null, Validators.required]
    })
  }
  get f() { return this.myform.controls}

  onsubmit(id){
    console.log(id);
    this.submited=true;
    if(this.myform.invalid){
       return
    }
    if(id === ''){
      this.add(this.myform.value)
    }else{
      this.edit(this.myform.value, id)
    }
  }

  add(data){
    this.quali_ser.add(data).subscribe(
      res=>{
         console.log(res);
         this.toaster.success('تم الاضافة بنجاح ')
         this.after()
      },err=>{
        console.log(err);
        this.toaster.error("خطا")
      }
    )
  }

  edit(data , id){
    this.quali_ser.edit(data, id).subscribe(
      res=>{
        console.log(res);
        this.toaster.success('تم التعديل بنجاح')
        this.after()
      }, err=>{
        console.log(err);
        this.toaster.error("خطا")
      }
    )
  }

  patch(){
    this.myform.patchValue({
      qualification:this.Catchobj.qualification
    })
  }

  after(){
    this.quali_ser.getAll().subscribe(
      res=>{
        this.newData.emit(res)
      }
    )
  }

}