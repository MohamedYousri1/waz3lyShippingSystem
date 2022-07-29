import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FinancialTransactService } from 'src/app/services/financial-transact.service';
@Component({
  selector: 'app-show-transact',
  templateUrl: './show-transact.component.html',
  styleUrls: ['./show-transact.component.css']
})
export class ShowTransactComponent implements OnInit {
  catchobj:any
  allData:any;
  constructor(private modal:NgbModal , private fi_trans:FinancialTransactService , private route:Router) { }
  recourdNumber:any;
  ngOnInit(): void {
    this.getAll()
  }

  allRevenue:any[]=[];
  allExpense:any[]=[]
 
  sumRevenue:number=0 ;
  sumExpense:number=0;
  selectedMembers:any;
  getAll(){ //get all
    this.fi_trans.getAll().subscribe(
      res=>{
        this.allData=res.map(data =>{
          if(data.revenue_id != null ){
            this.sumRevenue += data.price
            this.allRevenue.push(data)
            
          }else if (data.expense_id != null ){
            this.sumExpense += data.price
            // console.log(data.expense_id) 
            this.allExpense.push(data)            
          }
    
            return data;
        })

        this.selectedMembers = this.allData
        this.recourdNumber = this.allData.length;
        }

        
    )

  }

  add_edit(modal, obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catchobj = obj
  }

  after(event){
    this.allData=event
    this.modal.dismissAll()
  }
 
 
  getDate(start: Date, end: Date) {
    // console.log(this.selectedMembers)
    start = new Date(start)
    end = new Date(end);
      this.selectedMembers = this.allData.filter(m => {
        m.created_at = new Date(m.created_at);
        if ( m.created_at > start && m.created_at < end) {
          return m ;
        } 
        
  
      }
      );
    }

    swapTo(item:any){
      if(item.value == 1){
        this.selectedMembers = this.allRevenue
      }else if(item.value == 2){
        this.selectedMembers = this.allExpense
      }else{
        this.selectedMembers = this.allData
      }
    }

    toDailyKeepr(){
      this.route.navigate(['/daily-keeper'])
    }
  
}