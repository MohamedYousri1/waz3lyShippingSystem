import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AreasService } from 'src/app/services/areas.service';
import { BranchesService } from 'src/app/services/branches.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { StoragesService } from 'src/app/services/storages.service';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-storage',
  templateUrl: './edit-add-storage.component.html',
  styleUrls: ['./edit-add-storage.component.css']
})
export class EditAddStorageComponent implements OnInit {
  myfrom!: FormGroup
  submited: boolean = false
  id: any

  //two way binding
  @Input() Catchobj:any
  @Output() newData = new EventEmitter<any>()

  areas:any[]=[];
  branches:any[]=[];
  employees:any[]=[];

  constructor(private fb: FormBuilder,
    private stor_ser: StoragesService,
    private toastr: ToastrService,
    private area_ser:AreasService,
    private branch_ser:BranchesService,
    private empoyee_ser:EmployeeService  ,
    private x : MessageService ,
    ) { }

  ngOnInit(): void {
    this.build()
    this.patch()

    if(this.Catchobj){
      this.id=this.Catchobj.id
    }else{
      this.id=''
    }

    //new form here
    this.get_areas();
    this.get_branches();
    this.get_employees();

  }


  //new form here
  get_areas(){
    this.area_ser.get_All().subscribe(
      res=>{
        this.areas=res.areas
      }
    )
  }

  get_branches(){
    this.branch_ser.get_branchs().subscribe(
      res=>{
        this.branches=res.branches
      }
    )
  }

  get_employees(){
    this.empoyee_ser.employ().subscribe(
      res=>{
        this.employees=res.employees?.data
      }
    )
  }

  build() {
    this.myfrom = this.fb.group({
      name: [null, Validators.required],
      phone: [null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/gm)]],
      address: [null, Validators.required],
      employee_id: [null],
      branche_id: [null, Validators.required],
      // area_id: [null, Validators.required],
    })
  }
  get f() { return this.myfrom.controls }


  //submit
  onsubmit(id){
    this.submited=true
    if(this.myfrom.invalid){
      return;
    }
    if(id === ""){
      this.add(this.myfrom.value)
    }else{
      this.edit(this.myfrom.value, id)
    }
  }
  //add
  add(data){
    console.log('add working');
    if(this.myfrom.controls.name.value.trim() == null )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال اسم المخزن'});
    }else if (this.myfrom.controls.address.value == null )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال العنوان'});
    }else if (this.myfrom.controls.branche_id.value  == null )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إختيار الفرع '});
    }else
    {
      this.stor_ser.add(data).subscribe(
        res=>{
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
          setTimeout(() => {
            this.after()
          }, 1000);
        },(err)=>{
          console.log(err);
          if(err){
            if(err.error?.errors.name){
              this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
            }else if(err.error?.errors.phone)
            {
             this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.phone[0]}`});
            }else if(err.error?.errors.address)
            {
             this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.address[0]}`});
            }else if(err.error?.errors.branche_id)
            {
             this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.branche_id[0]}`});
            }
          }

        }

      )
    }

  }


  //edit
  edit(data, id){

    if(this.myfrom.controls.name.value.trim() == null )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال اسم المخزن'});
    }else if (this.myfrom.controls.address.value == null )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إدخال العنوان'});
    }else if (this.myfrom.controls.branche_id.value  == null )
    {
      this.x.add({key: 'myKey2', severity:'warn', summary: 'Notification', detail: 'يرجي إختيار الفرع '});
    }else
    {

      this.stor_ser.edit(data,id).subscribe(
        res=>{
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
          this.after()
        },(err)=>{
          console.log(err);
          if(err){
            if(err.error?.errors.name){
              this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.name[0]}`});
            }else if(err.error?.errors.phone)
            {
             this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.phone[0]}`});
            }else if(err.error?.errors.address)
            {
             this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.address[0]}`});
            }else if(err.error?.errors.branche_id)
            {
             this.x.add({key: 'myKey1', severity:'error', summary: 'Notification', detail: `${err.error?.errors.branche_id[0]}`});
            }
          }

        }
      )
    }

  }

  //patch value
  patch(){
    this.myfrom.patchValue({
      name:this.Catchobj.name,
      phone:this.Catchobj.phone,
      address:this.Catchobj.address,
      employee_id:this.Catchobj.employee_id,
      branche_id:this.Catchobj.branche_id,
      // area_id:this.Catchobj.area_id,
    })
  }

  //new data
  after(){
    this.stor_ser.get_All().subscribe(
      res=>{
        this.newData.emit(res.store)
      }
    )
  }

}
