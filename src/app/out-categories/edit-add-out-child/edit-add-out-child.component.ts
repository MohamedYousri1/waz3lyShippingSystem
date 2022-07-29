
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OutsService } from 'src/app/services/outs.service';
import { StoragesService } from 'src/app/services/storages.service';

@Component({
  selector: 'app-edit-add-out-child',
  templateUrl: './edit-add-out-child.component.html',
  styleUrls: ['./edit-add-out-child.component.css']
})

export class EditAddOutChildComponent implements OnInit {
  myform!:FormGroup
  submited:boolean = false
  id:any;
  active_id:any //from routing


  //two way binding
  @Input() Catchobj;
  @Output() new_child_Data = new EventEmitter <any> ()


  parents:any[]=[]
  storages:any[]=[]
  constructor(private fb:FormBuilder,private Activ_rout:ActivatedRoute,  private ins_ser:OutsService, private stor_ser:StoragesService , private toaster:ToastrService) {}

  ngOnInit(): void {
    this.Activ_rout.params.subscribe(
      res=>{
        this.active_id=res.id  //catch it from activated rout make CRUD
      }
    )
    //console.log("from object => ", this.id);
    //console.log("from routing =>", this.active_id);
    this.build()
    this.patch()
    this.get_storages()
    if(this.Catchobj){
      this.id=this.Catchobj.id //catch id from object
    }else{
      this.id=''
    }
  }


  //get storages
  get_storages(){ //from select box
    this.stor_ser.get_All().subscribe(
      res=>{
        this.storages=res
      }
    )
  }


  build(){
    this.myform=this.fb.group({
      amount:[null, Validators.required],
      date:[null, Validators.required],
      out_category_id:this.active_id,
      storage_id:[null, Validators.required],
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
    console.log('aeddd');
    this.ins_ser.add(data).subscribe(
      res=>{
        console.log(res);
        this.toaster.success('تم الاضافة بنجاح ')
        this.after(this.active_id)
      },err=>{
        console.log(err);
        this.toaster.error("خطا")
      }
    )
  }

  edit(data , id){
    this.ins_ser.edit(data, id).subscribe(
      res=>{
        console.log(res);
        this.toaster.success('تم التعديل بنجاح')
        this.after(this.active_id)
      }, err=>{
        console.log(err);
        this.toaster.error("خطا")
      }
    )
  }

  patch(){
    this.myform.patchValue({
      storage_id:this.Catchobj.storage_id,
      amount:this.Catchobj.amount,
      in_category_id:this.active_id,
      date:this.Catchobj.date,
    })
  }

  after(id){
      this.ins_ser.get_one(id).subscribe(
        res=>{
          this.new_child_Data.emit(res)
        }
      )
    }
}

