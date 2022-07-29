import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { PowersService } from './../../services/powers.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-power',
  templateUrl: './edit-add-power.component.html',
  styleUrls: ['./edit-add-power.component.css']
})
export class EditAddPowerComponent implements OnInit {

  myform!:FormGroup
  submited:boolean = false

  @Input() Catchobj; //get from show for edit
  id:any;
  @Output() sent_new= new EventEmitter <any> () //sent new data
  constructor(
    private fb:FormBuilder,
    private power_serv:PowersService,
    private toster:ToastrService ,
    private x : MessageService ,
      ) { }

  ngOnInit(): void {
    this.build()
    this.allUsers() ;
    this.getPower()
    this.patch()
    this.get_permission() ;
    if (this.Catchobj) {
      this.id=this.Catchobj.id
    }else{
      this.id=''
    }
  }

  build(){
    this.myform=this.fb.group({
      user_id:[null, Validators.required] ,
      permissions:this.fb.group({
      permissions: this.fb.array([], [Validators.required])
      }) ,
    })
  }

  get f(){ return this.myform.controls}

  onsubmit(id){

    this.submited=true
    if(this.myform.invalid){
      return;
    }
    if(id === ""){
      this.add()
    }
    else{
      this.edit()
    }
  }
  formDataToSend = new FormData() ;
  add(){
console.log(this.myform.controls.permissions.value );
// console.log( this.myform.controls.user_id.value);


    this.power_serv.add_power(this.myform.controls.permissions.value , this.myform.controls.user_id.value).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
      //  console.log(res)
        setTimeout(() => {
          this.after_updatePower()  ;
        }, 1000);
        // this.getPower()

      },err=>{
        // console.log(err);
        if(err){
          if(err.error.name[0]){
            this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: 'هذا الاسم موجود مسبقا'});
          }else{
            this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: 'يرجي التاكد من البيانات صحيحه'});
          }
        }
      }
    )
  }


  powerLists;
  getPower(){
    this.power_serv.get_powers().subscribe(res =>{
      this.powerLists= res;
      // console.log(this.powerLists)
    })
  }

  edit(){
  console.log(this.myform.controls.permissions.value);

    this.power_serv.edit_power(this.myform.controls.permissions.value, this.myform.controls.user_id.value).subscribe(
      res=>{
        this.toster.success("تم التعديل بنجاح ")
        console.log(res)
                setTimeout(() => {

          this.after_updatePower()  ;
          // this.after_update()

        }, 1000);
      },err =>{
        console.log(err)
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لم يتم التعديل  '});

      }
    )
  }


  // patch value to form
  per:any
  perName:any
  patch(){
    // console.log(this.Catchobj.id)

    // this.per = this.Catchobj.permissions.map(item =>{
    //   this.perName = item.name
      // console.log(item.name)
    // })
    this.myform.patchValue({
      user_id :this.Catchobj.id,
      // permissions:this.perName,

    })
  }


  //after update
  after_update(){
    this.power_serv.get_permission().subscribe(
      res=>{
        this.sent_new.emit(res)
      }
    )
  }



    //after update
    after_updatePower(){
      this.power_serv.get_powers().subscribe(
        res=>{
          this.sent_new.emit(res)
        }
      )
    }

  onCbChange(e) {
    const permissions: FormArray = this.myform.get('permissions').get('permissions') as FormArray;

    if (e.target.checked) {
      permissions.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      permissions.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          permissions.removeAt(i);
          return;
        }
        i++;
      });
    }
 }


  allPermissions ;
  get_permission()
  {
    return this.power_serv.get_permission().subscribe(res =>  {
      this.allPermissions = res ;
    })
  }

  all_Users ;
  allUsers()
  {

    return this.power_serv.get_users().subscribe(res =>  {
      this.all_Users  = res ;
      // console.log(res);

    })
  }

}
