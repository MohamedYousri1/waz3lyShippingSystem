import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { FinancialTransactService } from 'src/app/services/financial-transact.service';

@Component({
  selector: 'app-edit-add-transact',
  templateUrl: './edit-add-transact.component.html',
  styleUrls: ['./edit-add-transact.component.css']
})
export class EditAddTransactComponent implements OnInit {
  myform!:FormGroup
  submited:boolean = false
  id:any;
  expense_id:any = null  ;
  revenue_id:any = null ;
  // exp_id:any;
  // rev_id:any
  price:number
  //two way in form
  title:any;
  description :string;
  created_at:any;

  //two way binding betwen components
  @Input() Catchobj;
  @Output() newData = new EventEmitter <any> ()


  parents:any[]=[] //drop down
  constructor(private fb:FormBuilder,private x : MessageService ,private  fi_trans:FinancialTransactService, private toaster:ToastrService) { }

  ngOnInit(): void {
    this.build()
    this.getRev();
    this.getExpen();
    // this.get_parents()

  }


  Revenues:any;
  getRev(){
    this.fi_trans.getRevenues().subscribe(res=>{
      this.Revenues = res
      return res
    })
  }

  Expenses:any;
  getExpen(){
    this.fi_trans.getExpenses().subscribe(res=>{
      this.Expenses = res
      return res
    })
  }


revSelect:boolean = true ;

expSelect:boolean = false;
  onchoose(item  :any ){


    if(item.value == 1 )
    {

      this.revSelect = true;
      this.expSelect = false;
    }else if(item.value == 2 )
    {

      this.revSelect = false;
      this.expSelect = true;


    }
}
formDataToSend = new FormData()

  build(){
    this.myform=this.fb.group({
      revenue_id :[null , Validators.required],
      expense_id :[null , Validators.required],
      price :[null, Validators.required],
      // created_at:[null, Validators.required],
      description  :[null, Validators.required],

    })
  }

  get f() { return this.myform.controls}
  onsubmit(){

    this.formDataToSend.append("price", JSON.stringify(this.price));
    this.formDataToSend.append("description",this.description);
    // this.formDataToSend.append("created_at",this.created_at);
    this.formDataToSend.append("revenue_id",JSON.stringify(this.revenue_id));
    this.formDataToSend.append("expense_id",JSON.stringify(this.expense_id));

    // this.submited=true;
    if(this.myform.invalid){

      this.add(this.formDataToSend);

      return
    }


  }

  add(data){

    this.fi_trans.add(data).subscribe(
      res=>{

        if(this.revenue_id != null){
          data.revenue_id = this.revenue_id;
          data.expense_id =null ;
        }else if (data.expense_id  !=null) {
          data.revenue_id = null;
          data.expense_id =this.expense_id ;
        }

        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});


        setTimeout(() => {
          this.after()

        }, 1000);
      },err=>{
        console.log(err)
            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: ' هناك خطا , يرجي التاكد من جميع البيانات صحيحيه وغير مكرره '});
      }
    )
  }


  after(){  // send new data
    this.fi_trans.getAll().subscribe(
      res=>{
        this.newData.emit(res)
      }
    )
  }

}
