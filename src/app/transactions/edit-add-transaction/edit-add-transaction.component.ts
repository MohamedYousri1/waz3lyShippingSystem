
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/services/transactions.service';
import { AreasService } from 'src/app/services/areas.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { ReceiveStatusesService } from 'src/app/services/receive-statuses.service';
import { BranchesService } from 'src/app/services/branches.service';
import {MessageService} from 'primeng/api';
import { StoragesService } from 'src/app/services/storages.service';
  @Component({
    providers : [MessageService] ,
  selector: 'app-edit-add-transaction',
  templateUrl: './edit-add-transaction.component.html',
  styleUrls: ['./edit-add-transaction.component.css']
})


export class EditAddTransactionComponent implements OnInit {

  myform!: FormGroup;
  submited: boolean = false
  itmeId: any

// this day
  today: Date;
  dtToday:any = new Date();

  month:any = this.dtToday.getMonth() + 1;
  day:any = this.dtToday.getDate();
  year:any = this.dtToday.getFullYear();
  minDate:any = this.year + '-' + this.month + '-' + this.day;


  //from child to parnt to refresh
  @Input() Catchobj: any
  @Output() items = new EventEmitter<any>()

  branches:any[]=[];
  employees:any[]=[];
  shipments:any[]=[];
  recives:any[]=[];


  constructor(private fb: FormBuilder,
    private transactions_ser: TransactionsService,
    private branch_ser:BranchesService,
    private employe_ser:EmployeeService,
    private shipment_ser:ShipmentsService,
    private recive_ser:ReceiveStatusesService,
    private toster: ToastrService ,
    private x : MessageService ,
    private storages_ser:StoragesService

    ){}

  ngOnInit(): void {
    //build form
    this.build()
    //patch value to form
    this.patchValue()
    if (this.Catchobj) {
      //console.log('edit working');
      this.itmeId = this.Catchobj.id
    } else {
      //console.log('add working');
      this.itmeId = ''
    }

    //from here
    this.get_branches();
    this.get_employees();
    this.get_recives();
    // this.get_shipments();
  }


  branId:number


  get_employees(){
    this.employe_ser.employ().subscribe(
      res=>{
        this.employees=res

      }
    )
  }

  //from here
  get_branches(){
    this.branch_ser.get_activated_branchs().subscribe(
      res=>{
        this.branches=res
      }
    )
  }

  showStorage:boolean=false;
  getBranchId(item:any){
    // console.log(item.value)
    this.showStorage =true;
    this.get_storage(item.value)
  }

  showToStorage:boolean=false;
  getBranchIdTo(item:any){
    // console.log(item.value)
    this.showToStorage =true;
    this.get_storage(item.value)
  }

  storages:any;
    //from here
    get_storage(id:number){
      this.storages_ser.get_storage(id).subscribe(
        res=>{
          this.storages=res
        }
      )
    }


    showShipmnets:boolean=false;
getShipmentId(item:any){
  console.log(item.value)

  this.showShipmnets = true
   this.get_shipments(item.value)
}


  get_shipments(id:number){
    this.storages_ser.get_shipments(id).subscribe(
      res=>{
        this.shipments=res
      }
    )
  }

  get_recives(){
    this.recive_ser.get_All().subscribe(
      res=>{
        this.recives=res

        console.log(res);
      }
    )
  }

  //build
  build() {
    this.myform = this.fb.group({
      date_of_receipt: [null, Validators.required],
      date_of_delivery: [null, Validators.required],
      from_branch_id: [null, Validators.required],
      to_branch_id: [null, Validators.required],
      from_storage_id :[null, Validators.required],
      to_storage_id :[null ,Validators.required ],
      employee_id: [null, Validators.required],
      shipment_id: [null, Validators.required],
      receive_status_id: [null, Validators.required],
    })
  }
  //for form errors
  get f() { return this.myform.controls }
// this.myform.value.date_of_receipt
  //submit form
  onsubmit(id: any) {
    this.submited = true
    if (this.myform.invalid) {
      return
    }

    if(new Date(this.myform.value.date_of_receipt) < new Date(this.myform.value.date_of_delivery)){
      if (id === "") {
        this.add(this.myform.value)
      } else {
        this.edit(this.myform.value, id)
      }
    }

  }

  //add function
  add(data) {
    debugger
    this.transactions_ser.add(data).subscribe(
      res => {
        console.log(res)
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after_up()
        }, 1000);
      },err=>{
        console.log(err)
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }



  //edit funciton
  edit(data, id) {
    this.transactions_ser.edit(data, id).subscribe(
      res => {
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after_up()
      },err=>{
        console.log(err);
          this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }


  //patch value for two way binding
  patchValue() {
    this.myform.patchValue({
      date_of_receipt:   this.Catchobj.date_of_receipt,
      date_of_delivery:  this.Catchobj.date_of_delivery,
      from_branch_id:    this.Catchobj.from_branch_id,
      to_branch_id:      this.Catchobj.to_branch_id,
      to_storage_id:      this.Catchobj.to_storage_id,
      from_storage_id : this.Catchobj.from_storage_id,
      employee_id:       this.Catchobj.employee_id,
      shipment_id:       this.Catchobj.shipment_id,
      receive_status_id: this.Catchobj.receive_status_id,
    })
  }

  //after added to send updated data to show
  after_up() {
    // console.log('after');
    this.transactions_ser.getAll().subscribe(
      res => {
        this.items.emit(res)
      }
    )
  }
}


