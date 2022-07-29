
  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { ToastrService } from 'ngx-toastr';
  import { InterestsService } from 'src/app/services/interests.service';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
    selector: 'app-edit-add-int',
    templateUrl: './edit-add-int.component.html',
    styleUrls: ['./edit-add-int.component.css']
  })

  export class EditAddIntComponent implements OnInit {

    myform!:FormGroup;
    submited:boolean=false;

    //catch id
    @Input() CatchId:any

    //from child to parnt to refresh
    @Output() items= new EventEmitter <any> ()


    constructor(private fb:FormBuilder,   private x : MessageService ,  private interst_ser:InterestsService, private toster:ToastrService) { }

    ngOnInit(): void {
      //build form
      this.build()
      //patch
      this.patchValue(this.CatchId)
    }

    //build
    build(){
      this.myform=this.fb.group({
        level:[null, Validators.required]
      })
    }
    get f(){return this.myform.controls}

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
        console.log('add fun');
        this.interst_ser.add(data).subscribe(
          res=>{
            this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
            setTimeout(() => {
              this.after_up()

            }, 1000);
          },err=>{
                this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
          }
        )
      }

    //edit funciton
      edit(data, id){
        this.interst_ser.edit(data, id).subscribe(
          res=>{
            this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
            this.after_up()
          },err=>{
            console.log(err);
              this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
          }
        )
      }


    //patch value for two way binding
    patchValue(id){
      this.interst_ser.getOne(id).subscribe(
        res=>{
          this.myform.patchValue({
            level:res.level
          })
        }
      )
    }

    //after added to send updated data to show
    after_up(){
      this.interst_ser.get_All().subscribe(
        res=>{
          this.items.emit(res)
        }
      )
    }
  }

