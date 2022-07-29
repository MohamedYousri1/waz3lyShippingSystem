import { TreasuryInService } from './../services/treasury-in.service';
import { Subject } from 'rxjs';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  providers : [MessageService , ConfirmationService] ,
  selector: 'app-treasury-in',
  templateUrl: './treasury-in.component.html',
  styleUrls: ['./treasury-in.component.css']
})
export class TreasuryInComponent implements OnInit {
employee_id : any ;
  constructor(
    private x : MessageService ,
    private confirmationService  :ConfirmationService ,
    private _treasuryIn  : TreasuryInService ,
    private modal : NgbModal
  ) {
    if(localStorage.getItem('userInfo'))
    {
      this.employee_id = JSON.parse(localStorage.getItem('userInfo')|| '{}').employee_id ;
    }
  }

  ngOnInit(): void {
    this.get_allTreasuries();
  }
  trainees_payments  :any ;
  income  :any ;

  is_loading : boolean  = false ;
  allData  : any[] ;
  // get All Data In To Traesury
  get_allTreasury_in(treasuryId  :any  )
  {
    debugger
    this.is_loading = true  ;
if(treasuryId == null || treasuryId == undefined )
{
  treasuryId = 1  ;
  this._treasuryIn.getAllData(1).subscribe((res:any) =>  {
    // this.trainees_payments = res.trainees_payments  ;
    this.income = res.data[0].income  ;
    this.allData   = res.data ;
    console.log(this.allData);
  console.log(this.allData[0]);


    this.modal.dismissAll()
  },err=>  {
    if(err.error == "user dose not have this permission")
    {
      this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'user dose not have this permission'});
    }
  },()=>  {
    this.is_loading = false  ;
  })
}
this._treasuryIn.getAllData(treasuryId).subscribe((res:any) =>  {
  // this.trainees_payments = res.trainees_payments  ;
  this.income = res.data?.income  ;
  this.allData   = res.data ;

  this.modal.dismissAll()
},err=>  {
  console.log(err);
  if(err.error == "user dose not have this permission")
  {
    this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'user dose not have this permission'});
  }
},()=> {
  this.is_loading = false ;
})

  }

  /////////////////////
  ///// Chnage Treasury

  // get All Treasuries
  allTreasuries  : any  ;
  get_allTreasuries()
  {
    debugger
    this._treasuryIn.get_allTreasuries().subscribe((res  : any ) =>  {

      console.log(res);
      this.allTreasuries  = res.treasuries ;
    },err=> {
      if(err.error == "user dose not have this permission")
      {
        this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'user dose not have this permission'});
      }
    })
  }
  changeTreasury(modal :any )
  {
    this.modal.open(modal , {size : 'xm'  , backdrop:'static' , keyboard:false }) ;
  }

  traesuryId : any;
  treasuryName :any  ;
  ontreasuryChange(traesuryId : any )
  {
    debugger
    this.traesuryId = traesuryId.id;
    this.treasuryName = traesuryId.label ;
    console.log(this.traesuryId);

  }
  filterByTreasury()
  {
    debugger
    this.get_allTreasury_in(this.traesuryId) ;
  }

  amountPaid : number = 0 ;
  amount : number    = 0 ;
  id : any ;
  type : any ;
  note : any ;
  payMoney(modal :any , rowData : any  )
  {
    debugger
    console.log(rowData);
    this.id = rowData.id
    this.amount = rowData.amount ;
    this.type = rowData.type_res ;
    this.modal.open(modal , {size : 'xs'  , backdrop:'static' , keyboard:false }) ;


  }



  saveMoney()
  {
    debugger

    if(this.note == null )
    {
      this.x.add({key: 'myKey2', severity:'error', summary: 'Elfajr', detail: 'Please Write Your Note To Save'});

    }else{
      this._treasuryIn.payment({note : this.note , id:this.id, amount : this.amount , type : this.type  , treasury_id   : this.traesuryId , employee_id : this.employee_id}).subscribe(res => {
        this.x.add({key: 'myKey2', severity:'success', summary: 'Elfajr', detail: 'Data Has Saved Successfully'});
        this.get_allTreasury_in(this.traesuryId) ;
        this.modal.dismissAll()
        },err=>  {
          console.log(err);
          if(err.error == "user dose not have this permission")
          {
            this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'user dose not have this permission'});
          }
        })
    }

  }



  lastTreasuryId : any  ;

  cancelPayment(rowData : any )
  {
    this.lastTreasuryId = rowData.treasury_id  ;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        return this._treasuryIn.cancelPayment(rowData).subscribe((res) => {
          this.x.add({key: 'myKey2', severity:'success', summary: 'Elfajr', detail: 'Data Saved Successfully'});
          setTimeout(() => {
            this.get_allTreasury_in(this.lastTreasuryId);
          }, 1000);
        },err=> {
          if(err.error == "user dose not have this permission")
          {
            this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'user dose not have this permission'});
          }
        })
      }
  });
  }

}
