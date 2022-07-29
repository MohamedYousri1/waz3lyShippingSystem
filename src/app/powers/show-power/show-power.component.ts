import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PowersService } from './../../services/powers.service';
import { Table } from 'primeng/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-power',
  templateUrl: './show-power.component.html',
  styleUrls: ['./show-power.component.css']
})
export class ShowPowerComponent implements OnInit {

  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  //For Pathing Data To Add Edit Component


  //For Get Data And Displed In DataTable
  powerLists: any[];

  //pagination
  rows = 5;
  recourdNumber:number;

  //catch id to send it to modal
  catch_obj:any
  permissions ;
  updateusers : boolean = false ;
createusers : boolean = false ;

  constructor(private power_serv:PowersService, private modal:NgbModal, private toaster:ToastrService) {
    // this.recourdNumber = this.powerLists.length;
       // check permissions  For USer
   if(JSON.parse(localStorage.getItem('employee')).permissions)
   {
    this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
   }
   if(this.permissions)
   {
     this.permissions.forEach(permission => {
          if(permission.name == 'update-users')
      {
        this.updateusers = true
      }
      if(permission.name == 'create-users')
      {
        this.createusers = true ;
      }
     });
   }
  }


  ngOnInit(): void {
    // console.log(this.getPower());
    // this.getPower();
    this.getPower ()
  }




  getPower(){
    this.power_serv.get_powers().subscribe(res =>{
      this.powerLists= res;
      // console.log(this.powerLists)
    })
  }

  allUsers:any;
  // getAllEmps ()
  // {
  //   return this.power_serv.get_users().subscribe(res => {
  //     this.allUsers = res
  //     // console.log(res)
  //   })
  // }

  per:any;
  edit_add(modal , obj){
    this.modal.open(modal , {size:'xl' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
    // console.log(obj)
    // console.log(obj.id)
    //  this.per = obj.permissions.map(item =>{
    //    console.log(item.name)
    //  })
      // console.log(obj.permissions)
    
    this.getPower ()
  }


  
  spec_user ;
  permissions_details(modal , obj){
    this.modal.open(modal , {size:'xl' , backdrop : 'static',keyboard : false})
    this.spec_user = obj
    // console.log(obj)
  }

  after(event){
    this.powerLists=event
    this.modal.dismissAll()
  }

  clear(table: Table) {
    table.clear();
  }

  // add_edit(modal, obj){
  //   this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
  //   this.catch_obj=obj
  // }

//   index: number
//   delete(item:any){
//       this.index= this.spec_user.indexOf(item);
//     if (this.index !== -1) {
//         this.spec_user.splice(this.index, 1);
//         this.power_serv.delete_section(item).subscribe( (data) =>{
      
//           return data; 
//         })
//     }     

// }



}
