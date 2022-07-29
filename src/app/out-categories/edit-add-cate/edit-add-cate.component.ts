
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OutCategoriesService } from 'src/app/services/out-categories.service';
import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-cate',
  templateUrl: './edit-add-cate.component.html',
  styleUrls: ['./edit-add-cate.component.css']
})


export class EditAddCateComponent implements OnInit {
  myform!:FormGroup
  submited:boolean = false
  id:any

  //two way in form
  title:any
  parent_id:any

  //two way binding betwen components
  @Input() Catchobj;
  @Output() newData = new EventEmitter <any> ()


  parents:any[]=[] //drop down
  constructor(private fb:FormBuilder,private x : MessageService ,    private in_ser:OutCategoriesService, private toaster:ToastrService) { }

  ngOnInit(): void {
    this.build()
    this.get_parents()
    if(this.Catchobj){
      this.id=this.Catchobj.id
      this.title=this.Catchobj.title
      this.parent_id=this.Catchobj.parent_id //if it here make two way binding
    }else{
      this.id=''
      this.title=''
      this.parent_id=0 //if it not here make it with zero value to make new parent
    }
  }

  ///new here
  get_parents(){
    this.in_ser.getAll().subscribe(
      res=>{
        this.parents=res
      }
    )
  }

  build(){
    this.myform=this.fb.group({
      title:[null, Validators.required],
      parent_id:0
    })
  }

  get f() { return this.myform.controls}

  onsubmit(id){
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
    debugger
    this.in_ser.add(data).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after()

        }, 1000);
      },err=>{
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }

  edit(data , id){
    this.in_ser.edit(data, id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after()
      },err=>{
        console.log(err);
          this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }

  /*
  patch(){
    this.myform.patchValue({
      name:this.Catchobj.name,
      parent_id:this.Catchobj.parent_id
    })
  }*/

  after(){  // send new data
    this.in_ser.getAll().subscribe(
      res=>{
        this.newData.emit(res)
      }
    )
  }

}

