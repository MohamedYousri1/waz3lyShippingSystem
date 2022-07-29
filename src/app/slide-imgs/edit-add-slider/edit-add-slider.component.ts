import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderService } from './../../services/slider.service';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-edit-add-slider',
  templateUrl: './edit-add-slider.component.html',
  styleUrls: ['./edit-add-slider.component.css']
})
export class EditAddSliderComponent implements OnInit {

  myform!:FormGroup
  submited:boolean=false
  id:any
  img_path :string ;

  //two way form child and parent
  @Input() Catchobj
  @Output() updated = new EventEmitter <any>()
  //get objcet here from parent
  constructor(private fb:FormBuilder,private modal:NgbModal ,private x : MessageService  , private slider_serv:SliderService){}

  ngOnInit(){
    this.build()
    //patch
    this.patch()
    if(this.Catchobj){
      this.id=this.Catchobj.id
    }else{
      this.id=""
    }


  }

  build(){
    this.myform=this.fb.group({

    })


  }

  selectedImage: File = null ;
  progData = new FormData();

  get f() {return this.myform.controls}


  onsubmit(id){
    this.submited=true
    if(this.myform.invalid){
      return;
    }

    if(id === ""){
      this.add(this.progData)
    }else{
      this.edit(this.myform.value, this.id)
    }
  }


  //add funciton
  add(data){
    debugger
    if(this.selectedImage.name)
    {
      this.progData.append("photo", this.selectedImage ,  this.selectedImage.name);
    }

    this.slider_serv.add(this.progData).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم الاضافه بنجاح'});
        setTimeout(() => {
          this.after_update()
        }, 1000);
      },err=> {
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي التاكد من مسار الصوره صحيح'});

      })
  }

  //edit function
  edit(data, id){


    if(this.selectedImage.name)
    {
      this.progData.append("img", this.selectedImage ,  this.selectedImage.name);
    }


    this.slider_serv.edit(this.progData, id).subscribe(
      res=>{
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التعديل بنجاح'});
        this.after_update() ;

      },err=>{
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification', detail: 'يرجي التاكد من جميع البيانات صحيحه'});

      }
    )
  }

  //two way binding
  patch(){

     this.myform.patchValue({


     })

  }

  //new value
  after_update(){
    this.slider_serv.getAll().subscribe(
      res=>{
        this.updated.emit(res.advertisement) ;

      }
    )
  }

  onImageChange(event:any)
  {

    if (event.files[0] && event.files)
    {
      ;
      this.selectedImage  =<File> event.files[0];

      let reader = new FileReader() ;
      reader.readAsDataURL(event.files[0]) ;
      reader.onload = (event:any) =>  {
        console.log(event);
       this.img_path  = reader.result as string ;
      }
    }
  }


}
