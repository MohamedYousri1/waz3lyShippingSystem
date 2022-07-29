import { ClientsService } from 'src/app/services/clients.service';
import { MessageService } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-accounts-details',
  templateUrl: './company-accounts-details.component.html',
  styleUrls: ['./company-accounts-details.component.css']
})
export class CompanyAccountsDetailsComponent implements OnInit {

  //pagination
  rows = 5;
  recourdNumber:number;


  constructor(
    private modal:NgbModal,
    private  _representative : ClientsService ,
    private x : MessageService ,
  ) { }

  ngOnInit(): void {

    this.get_all_representatives()  ;
  }

  // all variables Here
  allCompanies ;
  companyDetail ;
  get_all_representatives()
  {
    return this._representative.getAllCompanies().subscribe(res =>  {
      this.allCompanies =  res.companies;
    })
  }


  representativeData : any[] = []   ;
  addRepresentative( modal , company_id)
  {

    this.shipmentsIds = [] ;
    this.modal.open(modal,{size:'xl' , backdrop : 'static',keyboard : false}) ;
    return this._representative.addCompanyWall(company_id).subscribe((res : any ) =>  {
      this.representativeData  = res.company_detail ;
      console.log(res);
      // this.modal.dismissAll()
    } , ()=> {

    },()=> {
      //  invoke function that get all Representatives

    })
  }




  clearWallet(emp_id)
  {
    debugger
    return this._representative.clearWallet({company_accounts : this.shipmentsIds , company_id : emp_id}).subscribe(res =>  {
      this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم تصفيه حساب التاجر من المحفظه'});
      setTimeout(() => {
        this.modal.dismissAll('تم تصفيه حساب التاجر من المحفظه') ;
        this.get_all_representatives()
      }, 1000);

    } , ()=> {

    },()=> {
      //  invoke function that get all Representatives

    })
  }


  afterZeroWallet( modal , company_id)
  {
    debugger
    this.modal.open(modal,{size:'xl' , backdrop : 'static',keyboard : false}) ;
    return this._representative.afterZeroWallet(company_id).subscribe((res : any ) =>  {
      this.companyDetail  = res.account_detail ;
      console.log(res);
      // this.modal.dismissAll()
    } , ()=> {

    },()=> {
      //  invoke function that get all Representatives

    })
  }


  add_edit(modal,obj){
    debugger
    this.modal.open(modal,{size:'lg' , backdrop : 'static',keyboard : false}) //, backdrop: 'static'
    this.companyDetail = obj  ;

  }





   shipmentsIds : any[] = [] ;
    onChangeCheck(id : any  , event )
   {
     debugger
     console.log(id);
     if(event.target.checked == true )
     {
       if(this.shipmentsIds.indexOf(id) == -1 )
       {
         this.shipmentsIds.push(id) ;
       }
     }else
     {
       if(this.shipmentsIds.indexOf(id) != -1 )
       {
         this.shipmentsIds.splice(this.shipmentsIds.indexOf(id)  ,  1) ;
         console.log(this.shipmentsIds);
       }
     }
   }



moreDetails : any;
dataIsReady : boolean =  false ;
moreDetailsFun(modal : any  , obj )
{
  debugger
  this.moreDetails = null ;
  this.moreDetails = obj ;
  this.modal.open(modal , {size : 'lg' }) ;
  if(this.moreDetails != null && this.moreDetails != undefined)
  {
    this.dataIsReady = true ;
  }else
  {
    this.dataIsReady = false  ;
  }
}
}
