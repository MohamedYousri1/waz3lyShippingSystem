
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Country } from 'src/app/shared/models/country';
import { CountriesService } from 'src/app/services/countries.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-show-country',
  templateUrl: './show-country.component.html',
  styleUrls: ['./show-country.component.css']
})
export class ShowCountryComponent implements OnInit {

  //For Get Data And Displed In DataTable
  ways_List: any ;

  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:Country
  permissions ;
  updatecountrie : boolean = true ;
  createcountrie : boolean = true ;
  constructor(private count_ser:CountriesService, private  router:Router ,private modal:NgbModal, private toaster:ToastrService ,private confirmationService: ConfirmationService, private x : MessageService) {
                 // check permissions  For USer
                 if(JSON.parse(localStorage.getItem('employee')).permissions)
                 {
                  this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
                 }
                 if(this.permissions)
                 {
                   this.permissions.forEach(permission => {
                        if(permission.name == 'update-countries')
                    {
                      this.updatecountrie = true
                    }
                    if(permission.name == 'create-countries')
                    {
                      this.createcountrie = true ;
                    }



                   });
                 }

                 if(!this.updatecountrie || !this.createcountrie )
                 {
                   this.router.navigate(['/home'])
                 }
  }
  ngOnInit(): void {
    this.getAll()
  }

  //get all
  getAll(){
    this.count_ser.get_All().subscribe(
      res=>{
      this.ways_List=res.Country
      }
    )
  }

  //add_edit button
  add_edit(modal,obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }


  update(updateitmes:any){
    this.ways_List=updateitmes;
    this.modal.dismissAll()
  }


  clear(table: Table) {
    table.clear();
  }


  confirm(item:any) {
    this.confirmationService.confirm({
      message: 'هل تريد حذف دولة ؟',
      accept: () => {
        this.count_ser.delete_section(item).subscribe( (data) =>{
          this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف دولة '});
          this.getAll();
        },err =>{
          this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف دولة   '});

          console.log(err)
        })
      }
  });

    }
}

