import { TraedsuryOutService } from './../services/traedsury-out.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  providers : [MessageService , ConfirmationService] ,
  selector: 'app-treasury-out',
  templateUrl: './treasury-out.component.html',
  styleUrls: ['./treasury-out.component.css']
})
export class TreasuryOutComponent implements OnInit {
  employee_id : any ;
  constructor(
    private x : MessageService ,
    private confirmationService  :ConfirmationService ,
    private _treasuryIn  :TraedsuryOutService ,
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
  trainees_refund  :any ;
  expense  :any ;
  instructor :any
  is_loading : boolean  = false ;
  allData  : any ;
  saelsTeam : any ;
  // get All Data In To Traesury
  get_allTreasury_in(treasuryId  :any  )
  {
    debugger
    this.is_loading = true  ;
if(treasuryId == null || treasuryId == undefined )
{

  treasuryId = 1  ;
  this._treasuryIn.getAllData(1).subscribe((res:any) =>  {
    this.expense = res.data  ;
    this.allData   = res.data ;
    this.modal.dismissAll()
  },err=>  {
    if(err.error == "user dose not have this permission")
    {
      this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'user dose not have this permission'});
    }
    this.is_loading = false  ;
  },()=>  {
    this.is_loading = false  ;
  })
}
debugger
this._treasuryIn.getAllData(treasuryId).subscribe((res:any) =>  {
  // this.trainees_refund = res.trainees_refund  ;
  this.expense = res.data  ;
  // this.instructor = res.instructor_payments ;

  this.allData   = res.data ;
  console.log(res);


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
    this._treasuryIn.get_allTreasuries().subscribe((res : any ) =>  {
      this.allTreasuries  = res.treasuries ;
    })
  }
  changeTreasury(modal :any )
  {
    this.modal.open(modal , {size : 'xs'  , backdrop:'static' , keyboard:false }) ;
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
    this.note = null ;
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
      this.x.add({key: 'myKey2', severity:'error', summary: 'CLS', detail: 'Please Write Your Note To Save'});

    }else{
      this._treasuryIn.payment({note : this.note , id:this.id, amount : this.amount , type : this.type  , treasury_id   : this.traesuryId , employee_id : this.employee_id}).subscribe(res => {
        this.x.add({key: 'myKey2', severity:'success', summary: 'CLS', detail: 'Data Has Saved Successfully'});
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
          this.x.add({key: 'myKey2', severity:'success', summary: 'CLS', detail: 'Data Saved Successfully'});
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
