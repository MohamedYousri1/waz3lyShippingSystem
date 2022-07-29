import { Router } from '@angular/router';
import { Component, NgModule, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { IJob } from '../../shared/Jobs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/services/jobs.service';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'show-job',
  templateUrl: './show-job.component.html',
  styleUrls: ['./show-job.component.css']
})
export class ShowJobComponent  {

  modalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  //For Pathing Data To Add Edit Component


  //For Get Data And Displed In DataTable
  jobsList: any;

  //pagination
  rows = 5;
  recourdNumber:number;

  //catch id to send it to modal
  catch_obj:any
  permissions ;
  updatejob : boolean = true ;
  createjob : boolean = true ;
  constructor(private jobs_ser:JobsService, private confirmationService: ConfirmationService, private  router:Router ,private modal:NgbModal,private x : MessageService , private toaster:ToastrService) {
        // check permissions  For USer
        if(JSON.parse(localStorage.getItem('employee')).permissions)
        {
         this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
        }
        if(this.permissions)
        {
          this.permissions.forEach(permission => {
               if(permission.name == 'update-jobs')
           {
             this.updatejob = true
           }
           if(permission.name == 'create-jobs')
           {
             this.createjob = true ;
           }
          });
        }
        // if(!this.updatejob || !this.createjob )
        // {
        //   this.router.navigate(['/home'])
        // }
  }


  ngOnInit(): void {
    this.getJobs();
  }



  getJobs(){
    this.jobs_ser.get_Jobs().subscribe((res   : any ) =>{
      debugger
      this.jobsList=res.jobs
    })
  }

  edit_add(modal , obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }

  after(event){
    this.jobsList=event
    this.modal.dismissAll()
  }

  clear(table: Table) {
    table.clear();
  }
confirm(item:any) {
  this.confirmationService.confirm({
    message: 'هل تريد حذف الوظيفه؟',
    accept: () => {
      this.jobs_ser.delete_section(item).subscribe( (data) =>{
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف الوظيفة'});
        this.getJobs();
      },err =>{
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف الوظيفة  '});
        console.log(err)
      })
    }
});
  }
}
