import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CouponsService } from 'src/app/services/coupons.service';

import { MessageService } from 'primeng/api';
@Component({
  providers: [MessageService],
  selector: 'app-edit-add-coupon',
  templateUrl: './edit-add-coupon.component.html',
  styleUrls: ['./edit-add-coupon.component.css']
})
export class EditAddCouponComponent implements OnInit {
  myform!: FormGroup
  submited: boolean = false
  id: any

  //two way binding
  @Input() obj: any
  @Output() newData = new EventEmitter<any>()
  today: Date;
   dtToday:any = new Date();

   month:any = this.dtToday.getMonth() + 1;
   day:any = this.dtToday.getDate();
   year:any = this.dtToday.getFullYear();
   minDate:any = this.year + '-' + this.month + '-' + this.day;
  //catch number for edit
  coupon_num: any
  constructor(private fb: FormBuilder, private x: MessageService, private coup_ser: CouponsService, private toaster: ToastrService) {

  }

  ngOnInit(): void {

    this.build()
    this.patch()
    //if it is obj
    if (this.obj) {
      this.id = this.obj.id
    } else {
      this.id = ""
    }
    // console.log(x)
    // console.log(dtToday);

  }


  //build
  build() {
    this.myform = this.fb.group({
      name: [null, Validators.required],
      start_date:[null, [Validators.required]],
      end_date: [null, [Validators.required ]],
      is_percentage: [null, Validators.required],
      discount:  [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      number: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      uses_per_coupon: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    })
  }
  get f() { return this.myform.controls }

  //  start_date;
  // end_date ;


  //submit
  onsubmit(id) {

    this.submited = true;
    if (this.myform.invalid) {
      return
    }
    if(new Date(this.minDate) <= new Date(this.myform.value.start_date)  && new Date(this.minDate) <  new Date(this.myform.value.end_date)){
      console.log(this.myform.value)
      if (id === "") {
        this.add(this.myform.value)
        this.coupon_num = this.myform.value.number
      } else {
        this.edit(this.myform.value, id)
      }
    }
    else {
      this.x.add({ key: 'myKey1', severity: 'info', summary: 'Notification', detail: ' يرجى ادخال تاريخ صحيح ' });
    }

  }

  //add
  add(data) {

    this.coup_ser.add(data).subscribe(
      res => {
        console.log(res)
        this.x.add({ key: 'myKey2', severity: 'success', summary: 'Notification', detail: 'تم الاضافه بنجاح' });
        setTimeout(() => {
          this.after()
        }, 1000);
      }, err => {
        console.log(err)


        if(err.status == 200){
          this.x.add({ key: 'myKey2', severity: 'success', summary: 'Notification', detail: 'تم الاضافه بنجاح' });
        }
        setTimeout(() => {
          this.after()
        }, 1000);
        // this.x.add({ key: 'myKey1', severity: 'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره ' });

      }
    )
  }


  //edti
  edit(data, id) {
    this.coup_ser.edit(data, id).subscribe(
      res => {
        console.log(res)
        this.x.add({ key: 'myKey2', severity: 'success', summary: 'Notification', detail: 'تم التعديل بنجاح' });
        setTimeout(() => {
          this.after()
        }, 1000);
      }, err => {
        console.log(err);
        this.x.add({ key: 'myKey1', severity: 'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره ' });
      }
    )
  }


  //patch value
  patch() {
    this.myform.patchValue({
      name: this.obj.name,
      start_date: this.obj.start_date,
      end_date: this.obj.end_date,
      is_percentage: this.obj.is_percentage,
      discount: this.obj.discount,
      uses_per_coupon: this.obj.uses_per_coupon,

    })
  }

  after() {
    this.coup_ser.getAll().subscribe(
      res => {
        this.newData.emit(res)
      }
    )
  }

}
