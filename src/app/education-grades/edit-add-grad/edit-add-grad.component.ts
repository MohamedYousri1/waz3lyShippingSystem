
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EducationGradesService } from 'src/app/services/education-grades.service';
import { QualificationsService } from 'src/app/services/qualifications.service';

@Component({
  selector: 'app-edit-add-grad',
  templateUrl: './edit-add-grad.component.html',
  styleUrls: ['./edit-add-grad.component.css']
})
export class EditAddGradComponent implements OnInit {
  myform!:FormGroup
  submited:boolean = false
  id:any


  //two way binding
  @Input() Catchobj;
  @Output() newData = new EventEmitter <any> ()
  constructor(private fb:FormBuilder, private edu_ser:EducationGradesService, private toaster:ToastrService) { }

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
      grade:[null, Validators.required]
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
    this.edu_ser.add(data).subscribe(
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
    this.edu_ser.edit(data, id).subscribe(
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
      grade:this.Catchobj.grade
    })
  }

  after(){
    this.edu_ser.getAll().subscribe(
      res=>{
        this.newData.emit(res)
      }
    )
  }

}
