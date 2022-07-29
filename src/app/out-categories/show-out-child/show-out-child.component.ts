
  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { ToastrService } from 'ngx-toastr';
  import { InsService } from 'src/app/services/ins.service';
import { OutsService } from 'src/app/services/outs.service';


  @Component({
    selector: 'app-show-out-child',
    templateUrl: './show-out-child.component.html',
    styleUrls: ['./show-out-child.component.css']
  })
  export class ShowOutChildComponent implements OnInit {
    child_categories:any[]=[]
    catch_name:any
    catch_id=0

    //paginations
    recourdNumber:any
    row=5

    //catch object to send
    catchobj:any
    permissions ;
    updateouts : boolean = false ;
    createouts : boolean = false ;
    constructor(private  Activ_rout:ActivatedRoute, private rout:Router, private ins_ser:OutsService, private modal:NgbModal, private toaster:ToastrService) {
      this.Activ_rout.params.subscribe(
        res=>{
          this.catch_id=res.id //send real id to get its value
        }
      )


        // check permissions  For USer
        if(JSON.parse(localStorage.getItem('employee')).permissions)
        {
         this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
        }
        if(this.permissions)
        {
          this.permissions.forEach(permission => {
               if(permission.name == 'update-outs')
           {
             this.updateouts = true
           }
           if(permission.name == 'create-outs')
           {
             this.createouts = true ;
           }
          });
        }

        if(!this.updateouts || !this.createouts )
        {
          this.rout.navigate(['/home'])
        }
    }

    ngOnInit(): void {
      this.getAll(this.catch_id)
      //this.get_for_name(this.catch_id)
    }

    getAll(id){
      this.ins_ser.get_one(id).subscribe(
        res=>{
          //this.child_categories=Array.of(res);
          this.catch_name=res.name
          this.child_categories=res.ins
          console.log(this.child_categories);
        }
      )
    }

    add_edit(modal, obj){
      this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
      this.catchobj = obj
    }


    after(event){
      this.child_categories=event.ins
      this.modal.dismissAll()
      console.log(event);
    }



  /*get one for name
  get_for_name(id){
    this.ins_ser.get_one(id).subscribe(
      res=>{
        this.catch_name=res.name
      }
    )
  }*/

  }


