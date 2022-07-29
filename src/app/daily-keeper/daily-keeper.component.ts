import { Component, OnInit } from '@angular/core';
import { FinancialTransactService } from '../services/financial-transact.service';

@Component({
  selector: 'app-daily-keeper',
  templateUrl: './daily-keeper.component.html',
  styleUrls: ['./daily-keeper.component.css']
})
export class DailyKeeperComponent implements OnInit {
  allData:any;
  recourdNumberRev:any;
  recourdNumberExp:any

  allRevenue:any[]=[];
  allExpense:any[]=[]
  selectedMembers:any;
  sumRevenue:number=0 ;
  sumExpense:number=0;

  today:any = new Date();
   date:any ;
   allDate:any;

  constructor(private fi_trans:FinancialTransactService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){ //get all
this.date= this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate()
console.log(this.date);
console.log(new Date(this.date))

   
    this.fi_trans.getAll().subscribe(
      res=>{
        
        this.allData=res.map(data =>{
          data.created_at = new Date(data.created_at);
          this.allDate = data.created_at.getFullYear()+'-'+(data.created_at.getMonth()+1)+'-'+data.created_at.getDate()
          
         
          if(  this.allDate == this.date){

            console.log(this.allDate);
         console.log(this.date)
         
            if(data.revenue_id != null ){
              this.sumRevenue += data.price
              this.allRevenue.push(data)
              
            }else if (data.expense_id != null ){
              this.sumExpense += data.price
              // console.log(data.expense_id) 
              this.allExpense.push(data)            
            }

          
          }


          return data;
         
        })

        // this.selectedMembers = this.allData
        this.recourdNumberRev = this.allRevenue.length;
        this.recourdNumberExp = this.allExpense.length;
        }

        
    )

  }

}