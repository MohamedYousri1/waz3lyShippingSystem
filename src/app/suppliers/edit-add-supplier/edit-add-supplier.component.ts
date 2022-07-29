
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-edit-add-supplier',
  templateUrl: './edit-add-supplier.component.html',
  styleUrls: ['./edit-add-supplier.component.css']
})
export class EditAddSupplierComponent implements OnInit {
  myform!:FormGroup
  submited:boolean = false
  id:any


  //two way binding
  @Input() Catchobj;
  @Output() newData = new EventEmitter <any> ()
  constructor(private fb:FormBuilder, private quali_ser:SuppliersService, private toaster:ToastrService) { }

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
      name:[null, Validators.required]
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
      name:this.Catchobj.name
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