
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OutCategoriesService } from 'src/app/services/out-categories.service';

@Component({
  selector: 'app-show-out-cate',
  templateUrl: './show-out-cate.component.html',
  styleUrls: ['./show-out-cate.component.css']
})

export class ShowOutCateComponent implements OnInit {
  categories:any[]=[]
  catch_name:string='كل الاقسام '

  //paginations
  recourdNumber:any
  row=5

  //catch object to send
  catchobj:any
  permissions ;
  updateout_categories : boolean = false ;
  createout_categories : boolean = false ;
  constructor(private rout:Router,  private in_ser:OutCategoriesService, private toaster:ToastrService,
    private confirmationService: ConfirmationService , private modal:NgbModal,private x : MessageService)  {
      // check permissions  For USer
      if(JSON.parse(localStorage.getItem('employee')).permissions)
      {
       this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
      }
      if(this.permissions)
      {
        this.permissions.forEach(permission => {
             if(permission.name == 'update-out_categories')
         {
           this.updateout_categories = true
         }
         if(permission.name == 'create-out_categories')
         {
           this.createout_categories = true ;
         }
        });
      }


      if(!this.updateout_categories || !this.createout_categories )
      {
        this.rout.navigate(['/home'])
      }
   }

  ngOnInit(): void {
    this.getAll()
  }

  All(){
    this.getAll()
    this.catch_name="كل الاقسام"
  }

  getAll(){ //get all
    this.in_ser.getAll().subscribe(
      res=>{
        this.categories=res
      }
    )
  }

  add_edit(modal, obj){
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catchobj = obj
  }

  after(event){
    this.categories=event
    this.modal.dismissAll()
  }


  //here
  get_child(id,name){
    debugger
    this.catch_name=name
    this.in_ser.getChildes(id).subscribe(
      res=>{
        if(res.length === 0){  // لو انت فاضي يعني مش فيك حاجة
          this.catch_name=""  // يبقي انت يا معم اند بوينت وهنضيف فيك حاجات
          // this.rout.navigate(['/out_child', id]);
          // this.rout.navigate(['/in_child', id]);// ف يروح لل شيلد وياخد ال اي دي معاه عشان يمسكة
          //وبعد كده يروح علي الخاصين بالبنود عشان يضيف بنود علي االاند بوينت
        }else{
          this.categories=res // غير كده يبقي انت اب وهتتعرض مع خواتك
        }
      }
    )
  }


//   index: number
//   delete(item:any){
//       this.index= this.categories.indexOf(item);
//     if (this.index !== -1) {
//         this.categories.splice(this.index, 1);
//         this.in_ser.delete_section(item).subscribe( (data) =>{
//           return data;
//         })
//     }

// }


confirm(item:any) {


  this.confirmationService.confirm({
    message: 'هل تريد حذف مصروف ؟',
    accept: () => {
      this.in_ser.delete_section(item).subscribe( (data) =>{
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: ' تم حذف مصروف'});
        this.getAll()
      },err =>{
        this.x.add({key: 'Key1', severity:'info', summary: 'Notification', detail: '  لا يمكن حذف مصروف  '});

        console.log(err)
      })
    }
});

  }

}

