
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QualificationsComponent } from 'src/app/qualifications/qualifications.component';
import { EducationGradesService } from 'src/app/services/education-grades.service';
import { ExperianceService } from 'src/app/services/experiance.service';
  
  @Component({
    selector: 'app-edit-add-exper',
    templateUrl: './edit-add-exper.component.html',
    styleUrls: ['./edit-add-exper.component.css']
  })
  export class EditAddExperComponent implements OnInit {
    myform!:FormGroup
    submited:boolean = false
    id:any
  
  
    //two way binding
    @Input() Catchobj;
    @Output() newData = new EventEmitter <any> ()

    //new here
    qualis:any[]=[]
    educations:any[]=[]

    constructor(private fb:FormBuilder,
       private exper_ser:ExperianceService,
       private quali_ser:QualificationsComponent,
       private edu_ser:EducationGradesService,
       private toaster:ToastrService) { }
  
    ngOnInit(): void {
      this.build()
      this.patch()
      if(this.Catchobj){
        this.id=this.Catchobj.id
      }else{
        this.id=''
      }
    }
  

    //new from here
 
    build(){
      this.myform=this.fb.group({
            from:[null, Validators.required],
            to:[null, Validators.required],
            qualification_id:[null, Validators.required],
            education_grade_id:[null, Validators.required],
            salary:[null, Validators.required] 
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
      this.exper_ser.add(data).subscribe(
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
      this.exper_ser.edit(data, id).subscribe(
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
        from:this.Catchobj.from,
        to:this.Catchobj.to,
        qualification_id:this.Catchobj.qualification_id,
        education_grade_id:this.Catchobj.education_grade_id,
        salary:this.Catchobj.salary
      })
    }
  
    after(){
      this.exper_ser.getAll().subscribe(
        res=>{
          this.newData.emit(res)
        }
      )
    }
  
  }
