import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-repres-transact',
  templateUrl: './repres-transact.component.html',
  styleUrls: ['./repres-transact.component.css']
})
export class RepresTransactComponent implements OnInit {

  catchobj:any;
  constructor(private modal:NgbModal) { }


  ngOnInit(): void {
  }

    // add_edit(modal, obj){
  //   this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
  //   this.catchobj = obj
  // }

  after(event){
    // this.categories=event
    this.modal.dismissAll()
  }
  getDate(start: Date, end: Date) {
    start = new Date(start)
    // end = new Date(end);
    //   this.selectedMembers = this.allBacks.filter(m => {
    //     m.date_of_receipt = new Date(m.date_of_receipt);
    //     if (m.date_of_receipt > start && m.date_of_receipt < end) {
    //       return m ;
    //     } 
         
    //   }
    //   );
  
    }

}
