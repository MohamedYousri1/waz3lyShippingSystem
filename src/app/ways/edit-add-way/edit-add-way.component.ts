
  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { ToastrService } from 'ngx-toastr';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { WayService } from 'src/app/services/way.service';
  import {MessageService} from 'primeng/api';
  @Component({
    providers : [MessageService] ,
    selector: 'app-edit-add-way',
    templateUrl: './edit-add-way.component.html',
    styleUrls: ['./edit-add-way.component.css']
  })

    export class EditAddWayComponent implements OnInit {

    myform!:FormGroup;
    submited:boolean=false

    //catch id
    @Input() CatchId:any

    //from child to parnt to refresh
    @Output() items= new EventEmitter <any> ()


    constructor(private fb:FormBuilder,
        private way_ser:WayService,
         private toster:ToastrService ,
         private toastr:ToastrService,
         private x : MessageService

         ) { }

    ngOnInit(): void {
      //build form
      this.build()
      //patch
      this.patchValue(this.CatchId)
    }

    //build
    build(){
      this.myform=this.fb.group({
        way:[null, Validators.required]
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
      console.log('add fun');
      this.way_ser.add(data).subscribe(
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
        this.way_ser.edit(data, id).subscribe(
          res=>{
            this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
            setTimeout(() => {
              this.after_up()

            }, 1000);
          },err=>{
                this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
          }
        )
      }


    //patch value for two way binding
    patchValue(id){
      this.way_ser.getOne(id).subscribe(
        res=>{
          this.myform.patchValue({
            way:res.way
          })
        }
      )
    }

    //after added to send updated data to show
    after_up(){
      this.way_ser.get_All().subscribe(
        res=>{
          this.items.emit(res)
        }
      )
    }
  }

