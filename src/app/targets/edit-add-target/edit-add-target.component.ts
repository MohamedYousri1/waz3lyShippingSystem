
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TargetsService } from 'src/app/services/targets.service';


@Component({
  selector: 'app-edit-add-target',
  templateUrl: './edit-add-target.component.html',
  styleUrls: ['./edit-add-target.component.css']
})

  export class EditAddTargetComponent implements OnInit {

  myform!:FormGroup;
  submited:boolean=false
  itmeId:any



  //from child to parnt to refresh
  @Input() Catchobj:any
  @Output() items= new EventEmitter <any> ()


  constructor(private fb:FormBuilder,  private target_ser:TargetsService, private toster:ToastrService) { }

  ngOnInit(): void {
    //build form
    this.build()
    //patch value to form
    this.patchValue()
    if(this.Catchobj){
       //console.log('edit working');
      this.itmeId=this.Catchobj.id
    }else{
      //console.log('add working');
      this.itmeId=''
    }
  }

  //build
  build(){
    this.myform=this.fb.group({
      amount:[null, Validators.required],
      from:[null, Validators.required],
      to:[null, Validators.required],
      auto_division:0
    })
  }
  //for form errors
  get f() {return this.myform.controls}
  //submit form
  onsubmit(id:any){
    this.submited=true
    if(this.myform.invalid){
      return
    }
    if(id === ""){
      this.add(this.myform.value)
    }else{
      this.edit(this.myform.value, id)
    }
  }

  //add function
  add(data){
    // console.log('add fun');
    this.target_ser.add(data).subscribe(
      res=>{
        console.log(res);
        this.toster.success('تم الاضافة  بنجاح')
        this.after_up()
      },err=>{
        console.log(err);

        if(err){
          if(err.error.amount){
            this.toster.error(err.error.amount[0], 'خطا')
          }
          if(err.error.from){
            this.toster.error(err.error.from[0], 'خطا')
          }
          if(err.error.to){
            this.toster.error(err.error.to[0], 'خطا')
          }
        }
      }
    )
  }

  //edit funciton
  edit(data, id){
    this.target_ser.edit(data, id).subscribe(
      res=>{
        this.toster.success('تم التعديل بنجاح')
        this.after_up()
      },err=>{
        if(err){
          if(err.error.amount){
            this.toster.error(err.error.amount[0], 'خطا')
          }
          if(err.error.from){
            this.toster.error(err.error.from[0], 'خطا')
          }
          if(err.error.to){
            this.toster.error(err.error.to[0], 'خطا')
          }
        }
      }
    )
  }


  //patch value for two way binding
  patchValue(){
    this.myform.patchValue({
      amount:this.Catchobj.amount,
      from:this.Catchobj.from,
      to:this.Catchobj.to
    })
  }

  //after added to send updated data to show
  after_up(){
    console.log('after');
    this.target_ser.get_All().subscribe(
      res=>{
        this.items.emit(res)
      }
    )
  }
}

