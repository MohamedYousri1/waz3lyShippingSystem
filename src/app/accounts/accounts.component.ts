import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { AccountsService } from './../services/accounts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

    //pagination
    rows = 5;
    recourdNumber:number;
  constructor(private account_serv:AccountsService , private fb:FormBuilder) {
    // this.recourdNumber = this.allInOuts?.length;
   }

  ngOnInit(): void {
    this.getAllInOut()
    this.getCategoriesIns()
    this.getCategoriesOuts()
    this.getIn()
    this.getOut()
    this.build() ;

  }
  allInOuts
  allIn ;
  allOut ;
  allCategoriesIns ;
  allCategoriesOuts
  // استدعاء اجمالي المتحصلات  و الواردات يوم و شهر وسنه
  getAllInOut()
  {
    return this.account_serv.get_total_in_out().subscribe(res =>  {
      this.allInOuts = res ;
    })
  }


    // استدعاء اجمالي الايرادات  يوم و شهر وسنه
    getIn()
    {
      return this.account_serv.getIn().subscribe(res =>  {
        this.allIn = res ;
      })
    }

      // استدعاء اجمالي المتحصلات  و  يوم و شهر وسنه
  getOut()
  {
    return this.account_serv.getOut().subscribe(res =>  {
      this.allOut = res ;
    })
  }


    // تقارير بمتحصلات كل نوع من أنواع الأيرادات
    getCategoriesIns()
    {
      return this.account_serv.getCategoriesIns().subscribe(res =>  {
        this.allCategoriesIns = res ;
      })
    }

        // تقارير بمتحصلات كل نوع من أنواع التحصيلات
        getCategoriesOuts()
        {
          return this.account_serv.getCategoriesOuts().subscribe(res =>  {
            this.allCategoriesOuts = res ;
          })
        }

// اجمالي الربح

myform:FormGroup
submited:boolean=false
id:any

build(){
  this.myform=this.fb.group({
    start:[null, Validators.required] ,
    end:[null, Validators.required] ,

  })
}
get f() {return this.myform.controls}


onsubmit(id){
  this.submited=true
  if(this.myform.invalid){
    return;
  }else
  {
    this.add(this.myform.value)
  }

}
  totalProfit  ;
  //add funciton
  add(data){
   
    this.account_serv.add_profit(data).subscribe(
      res=>{
        this.totalProfit  = res  ;
        console.log(res);

      }
    )
  }

  clear(table: Table) {
    table.clear();
  }
}
