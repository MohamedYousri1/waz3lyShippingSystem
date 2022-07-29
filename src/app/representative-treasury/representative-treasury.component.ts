import { RepresentativeTreasuryService } from './../services/representative-treasury.service';
import { TransferMoneyService } from './../services/transfer-money.service';
import { ReportsService } from './../services/reports.service';

import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-representative-treasury',
  templateUrl: './representative-treasury.component.html',
  styleUrls: ['./representative-treasury.component.css']
})
export class RepresentativeTreasuryComponent implements OnInit {
  constructor(
    private _treasury  : TransferMoneyService ,
    private fb  : FormBuilder  ,
    private _representativeTreasury  : RepresentativeTreasuryService ,
    private modal : NgbModal
  ) { }

    expensesAndIncome  = [
      { name  : 'Expense' , value   :"expense" },
      { name  : 'Income' , value   :"income" }

    ]

  ngOnInit(): void {
    this.get_treasuries() ;
    this.revenuFormBuild() ;
    this.daySpecial = new Date().toLocaleDateString() ;
    debugger
    this._representativeTreasury.get_allData(this.formData.value).subscribe((res : any ) =>  {
      this.totalExpense = res.data?.total_expense;
      this.totalIncome = res.data?.total_income  ;

      this.filteredExpenses = res.data?.representative_expense ;
      this.filteredIncomes =  res.data?.representative_income ;
      // this.daySpecial = this.dataTable[0].payment_date
      console.log(res);
      // this.treasuryData  = res.expeincome_and_expense[0].treasury ;
    },err=>{
      console.log(err);
    })

}
  // get All Treasuries
  allTreasuries :any ;
  get_treasuries()
  {
    this._treasury.get_allTreasuries().subscribe((res : any) => {
      this.allTreasuries  = res.treasuries ;
    })
  }

  formData : any  ;
  revenuFormBuild()
  {
    this.formData = this.fb.group({
      from_date  : [null  , Validators.required],
      to_date  : [null  , Validators.required],
    })
  }

  // send Data To Server
  treasuryData : any ;
  totalExpense  : number  = 0  ;
  totalIncome    : number  = 0  ;
  daySpecial : any ;
  optValue : any  ;
  showeExpense  : boolean  =  true  ;
  showIncome  : boolean  =  true  ;
  filteredExpenses : any ;
  filteredIncomes : any ;

  sendData()
  {
    debugger
    this._representativeTreasury.get_allData(this.formData.value).subscribe((res : any ) =>  {
      this.totalExpense = res.data?.total_expense;
      this.totalIncome = res.data?.total_income  ;

      this.filteredExpenses = res.data?.representative_expense ;
      this.filteredIncomes =  res.data?.representative_income ;
      // this.daySpecial = this.dataTable[0].payment_date
      console.log(res);
      // this.treasuryData  = res.expeincome_and_expense[0].treasury ;
    },err=>  {
      console.log(err);
    })
  }

  filteredArray   :  any ;


  // onTypeChange(value : any)
  // {
  //   console.log(value);
  //   this.optValue = value ;
  //   this.filteredArray = this.dataTable.filter((data :  any) =>  {return data.type_report == value}) ;
  //   if(value)
  //   {
  //     if(value == 'expense')
  //     {
  //       this.totalExpense = 0 ;
  //       this.showeExpense = true ;
  //       this.showIncome = false  ;

  //       this.filteredArray.forEach((expense  :any ) => {
  //           this.totalExpense += expense.amount ;
  //       });
  //     }else if(value == 'income')
  //     {
  //       this.totalIncome = 0 ;
  //       this.showeExpense = false  ;
  //       this.showIncome = true  ;

  //       this.filteredArray.forEach((expense  :any ) => {
  //         this.totalIncome += expense.amount ;
  //     });
  //     }
  //   }else
  //   {
  //     this.showeExpense = true ;
  //     this.showIncome = true  ;
  //     this.filteredArray = this.dataTable  ;
  //   }
  // }
  allData = [
    {treasury_title : 'main' , id : 'Std50010' , titel_id : 'title id ' , first_name  : 'Mohamed ' , middle_name  : 'Yousri '  ,  last_name: 'Telep ' , product_name : 'Course one' , product_type : 'Course' , amount : 500 , treasury_payment_note :'asdadad' , transaction_date : '2020-12-16' , type_report :  'income'} ,
    {treasury_title : 'main' , id : 'Std50010' , titel_id : 'title id ' , first_name  : 'Mohamed ' , middle_name  : 'Yousri '  ,  last_name: 'Telep ' , product_name : 'Course one' , product_type : 'Course' , amount : 300 , treasury_payment_note :'asdadad' , transaction_date : '2020-12-16' , type_report :  'income'} ,
    {treasury_title : 'main' , id : 'Std50010' , titel_id : 'title id ' , first_name  : 'Mohamed ' , middle_name  : 'Yousri '  ,  last_name: 'Telep ' , product_name : 'Course one' , product_type : 'Course' , amount : 5000 , treasury_payment_note :'asdadad' , transaction_date : '2020-12-16' , type_report :  'expense'} ,
    {treasury_title : 'main' , id : 'Std50010' , titel_id : 'title id ' , first_name  : 'Mohamed ' , middle_name  : 'Yousri '  ,  last_name: 'Telep ' , product_name : 'Course one' , product_type : 'Course' , amount : 400 , treasury_payment_note :'asdadad' , transaction_date : '2020-12-16' , type_report :  'income'} ,
    {treasury_title : 'main' , id : 'Std50010' , titel_id : 'title id ' , first_name  : 'Mohamed ' , middle_name  : 'Yousri '  ,  last_name: 'Telep ' , product_name : 'Course one' , product_type : 'Course' , amount : 9000 , treasury_payment_note :'asdadad' , transaction_date : '2020-12-16' , type_report :  'expense'} ,
    {treasury_title : 'main' , id : 'Std50010' , titel_id : 'title id ' , first_name  : 'Mohamed ' , middle_name  : 'Yousri '  ,  last_name: 'Telep ' , product_name : 'Course one' , product_type : 'Course' , amount : 7000 , treasury_payment_note :'asdadad' , transaction_date : '2020-12-16' , type_report :  'expense'} ,
    {treasury_title : 'main' , id : 'Std50010' , titel_id : 'title id ' , first_name  : 'Mohamed ' , middle_name  : 'Yousri '  ,  last_name: 'Telep ' , product_name : 'Course one' , product_type : 'Course' , amount : 600 , treasury_payment_note :'asdadad' , transaction_date : '2020-12-16' , type_report :  'income'} ,


  ]

  treasury_id : any ;
  amount : any ;
  notes : any ;
  openpayMoneyPop(modal : any )
  {
      this.modal.open(modal  , {size : 'xm' , backdrop : 'static'  , keyboard : false } )  ;
  }

  paidMoney()
  {
    this._representativeTreasury.paidMoney({amount :  this.amount , notes   : this.notes  , treasury_id :  this.treasury_id}).subscribe(res =>  {
      this.sendData();
    },err=>  {
      console.log(err);

    })
  }
}
