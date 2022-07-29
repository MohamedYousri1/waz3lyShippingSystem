import { TreasuryService } from './../services/treasury.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit ,ViewChild } from '@angular/core';
import { IncomeService } from 'src/app/services/income.service';
import { Subject } from 'rxjs';
import { ExpenseAndIncomesService } from '../services/expense-and-incomes.service';

@Component({
  providers : [MessageService ,ConfirmationService] ,
  selector: 'app-expense-and-incomes',
  templateUrl: './expense-and-incomes.component.html',
  styleUrls: ['./expense-and-incomes.component.css']
})
export class ExpenseAndIncomesComponent implements OnInit {
  empoloyee_id : any ;
  constructor(
    private _expenseIncome  : ExpenseAndIncomesService ,
    private fb : FormBuilder ,
    private x : MessageService ,
    private confirmationService : ConfirmationService ,
    private _treasury : TreasuryService
  ) {

    if(localStorage.getItem('employee'))
    {
      this.empoloyee_id = JSON.parse(localStorage.getItem('employee')|| '{}').id ;
    }

   }

  ngOnInit(): void {
    this.getExpenseIncome() ;
    this.get_allExpenses() ;
    this. get_allIncomesFun();
    this.formDataBuild() ;
    this.getTreasuries();
  }

  expenseCheck  : boolean = false ;
  checkIncomeFalse(event:any )
  {
    console.log(this.allDataExpense);

    console.log(event);
    if(event.checked == true )
    {
      this.expenseCheck = true ;
    }else
    {
      this.expenseCheck = false ;
    }
  }

  // get All Incomes
  allIncomes : any ;
  get_allIncomesFun()
  {
    this._expenseIncome.get_allIncomesDrop().subscribe((res : any ) => {
      this.allIncomes = res.income ;
    })
  }

    // get All Incomes
    allExpenses : any ;
    get_allExpenses()
    {
      this._expenseIncome.get_allExpensesDrop().subscribe((res : any ) => {
        this.allExpenses = res.expense ;
      })
    }
    formData : any ;
    formDataBuild()
    {
      this.formData = this.fb.group({
        price : [null ,Validators.required] ,
        payment_date : [null ,Validators.required] ,
        notes: [null ,Validators.required] ,
        recipient: [null ,Validators.required] ,
        name: [null ,Validators.required] ,

      })
    }

    incomeId : any ;
    expenseId : any ;
    treasuryId : any ;
    onIncomeChange(incomeId :any )
    {
      this.incomeId = incomeId ;
    }

    onExpenseChange(expense :any )
    {
      this.expenseId = expense ;
    }
    alltreasuriesMain  : any[] = [] ;
    mainTreasry_id :  any ;
    onTreasuryChange(mainTreasuryId : any )
    {
      debugger
      this.mainTreasry_id = mainTreasuryId ;
      this._treasury.get_allTreasuryInMain(mainTreasuryId).subscribe((res : any ) =>  {
        this.alltreasuriesMain = res.children_treasuries
      })
    }
    addData()
    {
      debugger
      if( this.expenseCheck == true )
      {

        this.incomeId = null ;
      }else if (this.expenseCheck == false )
      {
        this.expenseId = null
      }
      this.formData.removeControl('user_id') ;
      this.formData.addControl('user_id' , this.fb.control(this.empoloyee_id)) ;
      this.formData.removeControl('expense_id') ;
      this.formData.addControl('expense_id' , this.fb.control(this.expenseId)) ;
      this.formData.removeControl('income_id') ;
      this.formData.addControl('income_id' , this.fb.control(this.incomeId)) ;
      if(this.alltreasuriesMain.length ==  0)
      {
        this.formData.removeControl('treasurie_id') ;
        this.formData.addControl('treasurie_id' , this.fb.control(this.mainTreasry_id)) ;
      }else
      {
        this.formData.removeControl('treasurie_id') ;
        this.formData.addControl('treasurie_id' , this.fb.control(this.treasuryId)) ;
      }

      if( this.expenseCheck == true && this.expenseId == null )
      {
        this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'Please Select Expense Item '});
      }else if (this.expenseCheck == false  && this.incomeId == null  )
      {
        this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'Please Select Income Item'});
      }else
      {
        this._expenseIncome.addData(this.formData.value).subscribe(res =>  {
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'Data Saved Successfully'});
          console.log(res);
          this.getExpenseIncome() ;
          this.cancelForm()
          },err=> {
            console.log(err);
            if(err.error?.error)
            {
              this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error?.error[0]}`});
            }
          })
      }
    }
    cancelForm()
    {
      this.formData.reset()
      this.expenseId = null ;
      this.incomeId = null ;
      this.expenseCheck  = false
      document.querySelector('.p-togglebutton.p-button')?.classList.remove('p-highlight')
    }

    // get All Expense And incomes
    allData :any ;
    allDataExpense : any ;
    allDataIncomes  : any ;
    myEventSubscription  : any ;
    getExpenseIncome()
    {
    this.myEventSubscription  =   this._expenseIncome.get_allExpensesIncomes().subscribe((res  :any ) => {
        this.allDataExpense   = res?.income_and_expense?.filter((data : any  )=> {return data.expense_id != null }) ;
        this.allDataIncomes   = res?.income_and_expense?.filter((data : any  )=> {return data.income_id != null }) ;
      })

    }

    confirm(item:any[]) {
      this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this._expenseIncome.delete_data(item).subscribe(res => {
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'Data Saved Successfully'});
              this.getExpenseIncome() ;
            })
          }
      });
    }

    ngOnDestroy() {
      this.myEventSubscription.unsubscribe()
 }

 alltreasuries ;
 getTreasuries()
 {
  this._treasury.get_allTreasuryDrop  ().subscribe((res : any ) => {
    this.alltreasuries = res.treasuries ;
  })
 }


}
