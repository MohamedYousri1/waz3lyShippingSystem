import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { RepresentativesDetailsService } from '../services/representatives-details.service';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-representatives-details',
  templateUrl: './representatives-details.component.html',
  styleUrls: ['./representatives-details.component.css']
})
export class RepresentativesDetailsComponent implements OnInit {

  //pagination
  rows = 5;
  recourdNumber:number;


  constructor(
    private modal:NgbModal,
    private  _representative : RepresentativesDetailsService ,
    private x : MessageService ,
  ) { }

  ngOnInit(): void {

    this.get_all_representatives()  ;
  }

  // all variables Here
  allRepresentatives ;
  representativesDetail ;
  get_all_representatives()
  {
    return this._representative.get_allRepresentative().subscribe(res =>  {
      this.allRepresentatives =  res.representative  ;
    })
  }


  representativeData : any[] = []   ;
  addRepresentative( modal , representative_id)
  {

    this.shipmentsIds = [] ;
    this.modal.open(modal,{size:'xl' , backdrop : 'static',keyboard : false}) ;
    return this._representative.addRepresentative(representative_id).subscribe((res : any ) =>  {
      this.representativeData  = res.representative_account ;
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
    return this._representative.clearWallet({representative_accounts : this.shipmentsIds , representative_id : emp_id}).subscribe(res =>  {
      this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم تصفيه حساب المندوب من المحفظه'});
      setTimeout(() => {
        this.modal.dismissAll('تم تصفيه حساب المندوب من المحفظه') ;
        this.get_all_representatives()
      }, 1000);

    } , ()=> {

    },()=> {
      //  invoke function that get all Representatives

    })
  }


  afterZeroWallet( modal , representative_id)
  {
    debugger
    this.modal.open(modal,{size:'xl' , backdrop : 'static',keyboard : false}) ;
    return this._representative.afterZeroWallet(representative_id).subscribe((res : any ) =>  {
      this.representativesDetail  = res.account_detail ;
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
    this.representativesDetail = obj  ;

  }


    ///active and de_active
    active(obj){
      // this.is_active = !this.is_active;
       console.log('active');
       this._representative.active(obj).subscribe(
         res=>{
           console.log(res);
         }
       )
     }




  de_active(obj){
    //this.is_active = !this.is_active;
     console.log('de_active');
     this._representative.de_active(obj).subscribe(
       res=>{
         console.log(res);
       }
     )
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

  toggleButton(obj) {
    if(obj.user?.is_active === 0){
      this.active(obj);
    }else{
      this.de_active(obj);
    }
  }
}
